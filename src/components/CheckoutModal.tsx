import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, QrCode, CreditCard, Truck, ArrowLeft, ArrowRight, Copy, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, CustomerInfo, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  couponCode: string;
  onOrderCompleted: (order: Order) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  couponCode,
  onOrderCompleted,
  onClearCart,
}) => {
  const [step, setStep] = useState<'info_address' | 'payment' | 'success'>('info_address');
  
  // Customer info state
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: 'MG',
  });

  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState('');
  const [shippingOption, setShippingOption] = useState<'standard' | 'express'>('standard');
  const [formError, setFormError] = useState('');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card'>('pix');
  const [pixCopied, setPixCopied] = useState(false);
  const [pixCountdown, setPixCountdown] = useState(900); // 15 mins
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Credit card state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState(1);

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  let discountPercent = 0;
  if (couponCode.toUpperCase() === 'PRIMEIRACOMPRA' || couponCode.toUpperCase() === 'PENIEL10') {
    discountPercent = 0.10;
  } else if (couponCode.toUpperCase() === 'CROCANTE15') {
    discountPercent = 0.15;
  }
  const couponDiscount = subtotal * discountPercent;

  // Free shipping over 99
  const isFreeShipping = subtotal >= 99.0;
  const shippingCost = isFreeShipping
    ? 0.0
    : shippingOption === 'express'
    ? 19.0
    : 12.0;

  // Extra 5% discount on PIX
  const pixDiscount = paymentMethod === 'pix' ? (subtotal - couponDiscount) * 0.05 : 0;
  const finalTotal = Math.max(0, subtotal - couponDiscount - pixDiscount + shippingCost);

  // Format phone mask
  const handlePhoneChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    let formatted = raw;
    if (raw.length > 2) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}`;
      if (raw.length > 7) {
        formatted += `-${raw.slice(7, 11)}`;
      }
    }
    setCustomer((prev) => ({ ...prev, phone: formatted }));
  };

  // Format CEP mask & fetch ViaCEP
  const handleCepChange = async (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 8);
    let formatted = clean;
    if (clean.length > 5) {
      formatted = `${clean.slice(0, 5)}-${clean.slice(5, 8)}`;
    }
    setCustomer((prev) => ({ ...prev, cep: formatted }));

    if (clean.length === 8) {
      setLoadingCep(true);
      setCepError('');
      try {
        const response = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
        const data = await response.json();
        if (data.erro) {
          setCepError('CEP não encontrado. Preencha o endereço manualmente.');
        } else {
          setCustomer((prev) => ({
            ...prev,
            street: data.logradouro || prev.street,
            neighborhood: data.bairro || prev.neighborhood,
            city: data.localidade || prev.city,
            state: data.uf || prev.state,
          }));
        }
      } catch (err) {
        // Fallback for offline environments
        setCepError('');
      } finally {
        setLoadingCep(false);
      }
    }
  };

  // Card formatting
  const handleCardNumberChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 16);
    const parts = clean.match(/.{1,4}/g);
    setCardNumber(parts ? parts.join(' ') : clean);
  };

  const handleExpiryChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 2) {
      setCardExpiry(`${clean.slice(0, 2)}/${clean.slice(2, 4)}`);
    } else {
      setCardExpiry(clean);
    }
  };

  // Countdown timer for PIX
  useEffect(() => {
    if (step === 'payment' && paymentMethod === 'pix' && pixCountdown > 0) {
      const timer = setInterval(() => {
        setPixCountdown((c) => c - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, paymentMethod, pixCountdown]);

  if (!isOpen) return null;

  const handleValidateInfo = () => {
    if (!customer.fullName.trim()) {
      setFormError('Por favor, informe seu nome completo.');
      return;
    }
    if (!customer.email.trim() || !customer.email.includes('@')) {
      setFormError('Por favor, informe um e-mail válido.');
      return;
    }
    if (customer.phone.replace(/\D/g, '').length < 10) {
      setFormError('Por favor, informe seu telefone com DDD.');
      return;
    }
    if (customer.cep.replace(/\D/g, '').length < 8) {
      setFormError('Por favor, informe um CEP válido.');
      return;
    }
    if (!customer.street.trim() || !customer.number.trim()) {
      setFormError('Por favor, informe o logradouro e o número.');
      return;
    }

    setFormError('');
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    if (paymentMethod === 'credit_card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        setFormError('Número do cartão inválido.');
        return;
      }
      if (!cardName.trim()) {
        setFormError('Nome impresso no cartão obrigatório.');
        return;
      }
      if (cardExpiry.length < 5) {
        setFormError('Data de validade do cartão incompleta (MM/AA).');
        return;
      }
      if (cardCvv.length < 3) {
        setFormError('CVV inválido.');
        return;
      }
    }

    setIsProcessing(true);
    setFormError('');

    setTimeout(() => {
      const orderId = `PEN-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('pt-BR'),
        items: [...items],
        subtotal,
        discount: couponDiscount + pixDiscount,
        shipping: shippingCost,
        total: finalTotal,
        paymentMethod,
        status: 'Fornada Pronta',
        trackingCode: `BR${Math.floor(100000000 + Math.random() * 900000000)}MG`,
        customer,
      };

      setLastOrder(newOrder);
      onOrderCompleted(newOrder);
      onClearCart();
      setIsProcessing(false);
      setStep('success');

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#1A472A', '#F2B824', '#ffffff', '#25D366'],
        });
      } catch (e) {
        // fallback
      }
    }, 1200);
  };

  const pixKeyMock = `00020126580014BR.GOV.BCB.PIX0136penielchips-${customer.phone.replace(/\D/g, '') || 'oficial'}520400005303986540${finalTotal.toFixed(2)}5802BR5920Peniel Chips Alim6009Uberlandia62070503***6304`;

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixKeyMock);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#D5CCBA] p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍌</span>
            <span className="text-base sm:text-lg font-black text-[#133821] font-heading">
              Finalização de Compra Segura
            </span>
          </div>

          {step !== 'success' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#657569] hover:bg-[#EFEAE0] hover:text-[#1F2722] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Progress Indicators */}
        {step !== 'success' && (
          <div className="flex items-center justify-center gap-4 py-4 border-b border-[#F0EAE0] text-xs font-semibold">
            <div
              className={`flex items-center gap-1.5 ${
                step === 'info_address' ? 'text-[#1A472A] font-bold' : 'text-[#829286]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#1A472A] text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Dados & Entrega</span>
            </div>

            <div className="w-8 h-0.5 bg-[#DDD5C5]" />

            <div
              className={`flex items-center gap-1.5 ${
                step === 'payment' ? 'text-[#1A472A] font-bold' : 'text-[#829286]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === 'payment' ? 'bg-[#1A472A] text-white' : 'bg-[#DDD5C5] text-[#4F5D52]'
                }`}
              >
                2
              </span>
              <span>Pagamento Seguro</span>
            </div>
          </div>
        )}

        {/* Step 1: Client Information & Delivery Address */}
        {step === 'info_address' && (
          <div className="mt-5 space-y-5">
            {formError && (
              <div className="p-3 rounded-xl bg-[#FDF2F2] border border-[#F8B4B4] text-xs text-[#9B1C1C] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Customer Personal Details */}
            <div>
              <h3 className="text-xs font-bold text-[#1A472A] uppercase tracking-wider mb-3">
                1. Seus Dados Pessoais
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#46554A] mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Lucas Ribeiro"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C5] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#46554A] mb-1">
                    E-mail para confirmação *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C5] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#46554A] mb-1">
                    WhatsApp / Telefone *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="(34) 99711-3486"
                    value={customer.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C5] rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-[#1A472A] uppercase tracking-wider">
                  2. Endereço de Entrega
                </h3>
                {loadingCep && (
                  <span className="text-[11px] text-[#8C6D1F] animate-pulse">
                    Buscando CEP...
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#46554A] mb-1">
                    CEP *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="38400-000"
                    value={customer.cep}
                    onChange={(e) => handleCepChange(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C5] rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  />
                  {cepError && (
                    <span className="text-[10px] text-[#C93B2B]">{cepError}</span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#46554A] mb-1">
                    Rua / Avenida *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Av. Rondon Pacheco"
                    value={customer.street}
                    onChange={(e) => setCustomer({ ...customer, street: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C5] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#46554A] mb-1">
                    Número *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    value={customer.number}
                    onChange={(e) => setCustomer({ ...customer, number: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C5] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#46554A] mb-1">
                    Complemento
                  </label>
                  <input
                    type="text"
                    placeholder="Apto 101, Bloco B"
                    value={customer.complement}
                    onChange={(e) => setCustomer({ ...customer, complement: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C5] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#46554A] mb-1">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Centro / Tabajaras"
                    value={customer.neighborhood}
                    onChange={(e) => setCustomer({ ...customer, neighborhood: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C5] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#46554A] mb-1">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Uberlândia"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C5] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#46554A] mb-1">
                    Estado (UF) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    placeholder="MG"
                    value={customer.state}
                    onChange={(e) => setCustomer({ ...customer, state: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C5] rounded-xl text-xs sm:text-sm font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Mode Selector */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-[#1A472A] uppercase tracking-wider mb-2">
                3. Opção de Envio
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShippingOption('standard')}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                    shippingOption === 'standard'
                      ? 'bg-[#FAF7F2] border-[#1A472A] ring-1 ring-[#1A472A]'
                      : 'bg-white border-[#DDD5C5] hover:border-[#1A472A]'
                  }`}
                >
                  <div>
                    <span className="block text-xs font-bold text-[#1F2722]">
                      Entrega Padrão Correios / Jadlog
                    </span>
                    <span className="text-[11px] text-[#69796E]">3 a 5 dias úteis</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#1A472A]">
                    {isFreeShipping ? 'GRÁTIS' : 'R$ 12,00'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingOption('express')}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                    shippingOption === 'express'
                      ? 'bg-[#FAF7F2] border-[#1A472A] ring-1 ring-[#1A472A]'
                      : 'bg-white border-[#DDD5C5] hover:border-[#1A472A]'
                  }`}
                >
                  <div>
                    <span className="block text-xs font-bold text-[#1F2722]">
                      Sedex Expresso / Entrega Rápida
                    </span>
                    <span className="text-[11px] text-[#69796E]">1 a 2 dias úteis</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#1A472A]">
                    {isFreeShipping ? '+ R$ 9,00' : 'R$ 19,00'}
                  </span>
                </button>
              </div>
            </div>

            {/* Bottom Proceed Button */}
            <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#6B7C70] block leading-none">Total com frete</span>
                <span className="text-xl font-black text-[#133821] font-mono tabular-nums">
                  R$ {finalTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <button
                type="button"
                onClick={handleValidateInfo}
                className="px-6 py-3 bg-[#1A472A] hover:bg-[#133821] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>Avançar para Pagamento</span>
                <ArrowRight className="w-4 h-4 text-[#F2B824]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment (PIX or Credit Card) */}
        {step === 'payment' && (
          <div className="mt-5 space-y-5">
            {formError && (
              <div className="p-3 rounded-xl bg-[#FDF2F2] border border-[#F8B4B4] text-xs text-[#9B1C1C] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Payment Method Switch Tabs */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'pix'
                    ? 'bg-[#1A472A] text-white border-[#1A472A] shadow-xs'
                    : 'bg-[#FAF7F2] text-[#334237] border-[#DDD5C5] hover:border-[#1A472A]'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 font-bold text-xs sm:text-sm">
                  <QrCode className="w-4 h-4 text-[#F2B824]" />
                  <span>PIX Instantâneo</span>
                </div>
                <span className="text-[10px] block mt-0.5 text-[#F2B824] font-bold">
                  + 5% de desconto extra!
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'credit_card'
                    ? 'bg-[#1A472A] text-white border-[#1A472A] shadow-xs'
                    : 'bg-[#FAF7F2] text-[#334237] border-[#DDD5C5] hover:border-[#1A472A]'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 font-bold text-xs sm:text-sm">
                  <CreditCard className="w-4 h-4 text-[#F2B824]" />
                  <span>Cartão de Crédito</span>
                </div>
                <span className="text-[10px] block mt-0.5 text-[#A5C9B0]">
                  Até 3x sem juros
                </span>
              </button>
            </div>

            {/* PIX Payment Display */}
            {paymentMethod === 'pix' && (
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DECF] text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7EE] text-[#15803D] text-xs font-bold border border-[#C6ECCB]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>5% de desconto aplicado automaticamente no PIX!</span>
                </div>

                {/* Simulated Real Dynamic SVG QR Code */}
                <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl border-2 border-[#1A472A] shadow-sm flex flex-col items-center justify-center">
                  <svg className="w-full h-full text-[#1A472A]" viewBox="0 0 100 100" fill="currentColor">
                    {/* Stylized QR Code Pattern */}
                    <rect x="5" y="5" width="28" height="28" fill="#1A472A" />
                    <rect x="9" y="9" width="20" height="20" fill="white" />
                    <rect x="13" y="13" width="12" height="12" fill="#1A472A" />
                    
                    <rect x="67" y="5" width="28" height="28" fill="#1A472A" />
                    <rect x="71" y="9" width="20" height="20" fill="white" />
                    <rect x="75" y="13" width="12" height="12" fill="#1A472A" />

                    <rect x="5" y="67" width="28" height="28" fill="#1A472A" />
                    <rect x="9" y="71" width="20" height="20" fill="white" />
                    <rect x="13" y="75" width="12" height="12" fill="#1A472A" />

                    {/* Data matrix dots */}
                    <rect x="40" y="8" width="8" height="8" fill="#1A472A" />
                    <rect x="52" y="12" width="6" height="6" fill="#1A472A" />
                    <rect x="38" y="22" width="10" height="6" fill="#1A472A" />
                    <rect x="10" y="40" width="8" height="8" fill="#1A472A" />
                    <rect x="25" y="44" width="8" height="8" fill="#1A472A" />
                    <rect x="40" y="40" width="20" height="20" fill="#F2B824" rx="4" />
                    <rect x="66" y="40" width="8" height="8" fill="#1A472A" />
                    <rect x="80" y="45" width="12" height="8" fill="#1A472A" />
                    <rect x="40" y="68" width="8" height="12" fill="#1A472A" />
                    <rect x="55" y="72" width="10" height="8" fill="#1A472A" />
                    <rect x="72" y="68" width="16" height="8" fill="#1A472A" />
                    <rect x="80" y="82" width="10" height="10" fill="#1A472A" />
                  </svg>
                </div>

                <div className="text-xs text-[#526055]">
                  <span>Expira em: </span>
                  <strong className="text-[#C93B2B] font-mono">
                    {Math.floor(pixCountdown / 60)}:{('0' + (pixCountdown % 60)).slice(-2)}
                  </strong>
                </div>

                {/* Copy PIX Key */}
                <div className="space-y-2 max-w-md mx-auto">
                  <div className="p-2.5 bg-white border border-[#DDD5C5] rounded-xl flex items-center justify-between text-xs font-mono text-[#526256] truncate">
                    <span className="truncate pr-2">{pixKeyMock}</span>
                    <button
                      type="button"
                      onClick={copyPixCode}
                      className="px-2.5 py-1 bg-[#1A472A] hover:bg-[#133821] text-white rounded-lg text-xs font-sans font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      {pixCopied ? (
                        <>
                          <Check className="w-3 h-3 text-[#F2B824]" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar Código</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#718275]">
                    Abra o app do seu banco, escolha <strong>Pix Copia e Cola</strong> e cole o código acima.
                  </p>
                </div>
              </div>
            )}

            {/* Credit Card Display */}
            {paymentMethod === 'credit_card' && (
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DECF] space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#46554A] mb-1">
                    Número do Cartão de Crédito *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#DDD5C5] rounded-xl text-xs sm:text-sm font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#46554A] mb-1">
                    Nome Completo Como no Cartão *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="LUCAS A RIBEIRO"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 bg-white border border-[#DDD5C5] rounded-xl text-xs sm:text-sm uppercase focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#46554A] mb-1">
                      Validade (MM/AA) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#DDD5C5] rounded-xl text-xs sm:text-sm font-mono text-center focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#46554A] mb-1">
                      CVV (Código de segurança) *
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="w-full px-3 py-2 bg-white border border-[#DDD5C5] rounded-xl text-xs sm:text-sm font-mono text-center focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#46554A] mb-1">
                    Parcelamento
                  </label>
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#DDD5C5] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  >
                    <option value={1}>
                      1x de R$ {finalTotal.toFixed(2).replace('.', ',')} (à vista sem juros)
                    </option>
                    <option value={2}>
                      2x de R$ {(finalTotal / 2).toFixed(2).replace('.', ',')} (sem juros)
                    </option>
                    <option value={3}>
                      3x de R$ {(finalTotal / 3).toFixed(2).replace('.', ',')} (sem juros)
                    </option>
                    <option value={4}>
                      4x de R$ {((finalTotal * 1.04) / 4).toFixed(2).replace('.', ',')} (com juros leves)
                    </option>
                    <option value={6}>
                      6x de R$ {((finalTotal * 1.06) / 6).toFixed(2).replace('.', ',')} (com juros leves)
                    </option>
                  </select>
                </div>
              </div>
            )}

            {/* Total Recap & Action */}
            <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('info_address')}
                className="text-xs font-bold text-[#657569] hover:text-[#1A472A] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar</span>
              </button>

              <button
                type="button"
                onClick={handleCompleteOrder}
                disabled={isProcessing}
                className="px-6 py-3 bg-[#1A472A] hover:bg-[#133821] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processando Pedido...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#F2B824]" />
                    <span>
                      {paymentMethod === 'pix'
                        ? 'Confirmar Pagamento PIX'
                        : `Pagar R$ ${finalTotal.toFixed(2).replace('.', ',')}`}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Screen */}
        {step === 'success' && lastOrder && (
          <div className="py-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#15803D] border border-[#C6ECCB] flex items-center justify-center mx-auto shadow-xs">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#8C6D1F] uppercase tracking-wider block mb-1">
                Fornada Reservada com Sucesso! 🎉
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#133821] font-heading">
                Pedido #{lastOrder.id} Confirmado!
              </h3>
              <p className="text-xs sm:text-sm text-[#4E5E52] mt-1 max-w-md mx-auto">
                Obrigado por apoiar a produção artesanal da Peniel Chips! Enviamos todos os detalhes para <strong>{customer.email}</strong>.
              </p>
            </div>

            {/* Order Summary Receipt Box */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5] text-left max-w-md mx-auto text-xs space-y-2">
              <div className="flex justify-between pb-2 border-b border-[#EBE4D6]">
                <span className="text-[#657569]">Código de Rastreio:</span>
                <strong className="font-mono text-[#1F2722]">{lastOrder.trackingCode}</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#EBE4D6]">
                <span className="text-[#657569]">Destinatário:</span>
                <span className="font-medium text-[#1F2722]">{customer.fullName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#EBE4D6]">
                <span className="text-[#657569]">Endereço:</span>
                <span className="font-medium text-[#1F2722] text-right truncate pl-2">
                  {customer.street}, {customer.number} - {customer.city}/{customer.state}
                </span>
              </div>
              <div className="flex justify-between font-bold text-[#133821] text-sm pt-1">
                <span>Total Pago:</span>
                <span className="font-mono tabular-nums text-[#1A472A]">
                  R$ {lastOrder.total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* WhatsApp Contact Action */}
            <div className="space-y-3 pt-2 max-w-md mx-auto">
              <a
                href={`https://wa.me/5534997113486?text=Ol%C3%A1!%20Acabei%20de%20fazer%20o%20pedido%20%23${lastOrder.id}%20pelo%20site%20da%20Peniel%20Chips%20no%20valor%20de%20R$%20${lastOrder.total.toFixed(2).replace('.', ',')}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20BE5C] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <span>Falar com a Peniel no WhatsApp: (34) 9 9711-3486</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs font-bold text-[#4B5A50] hover:text-[#1A472A] cursor-pointer"
              >
                Voltar à Loja
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
