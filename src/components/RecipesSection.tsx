import React, { useState } from 'react';
import { ChefHat, Clock, Users, ArrowRight, ShoppingBag, X, Check } from 'lucide-react';
import { RECIPES } from '../data/recipes';
import { PRODUCTS } from '../data/products';
import { Recipe, Product } from '../types';

interface RecipesSectionProps {
  onAddToCart: (product: Product, selectedWeight: string, unitPrice: number, quantity: number) => void;
}

export const RecipesSection: React.FC<RecipesSectionProps> = ({ onAddToCart }) => {
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const handleAddChipsForRecipe = (recipe: Recipe, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const product = PRODUCTS.find((p) => p.id === recipe.chipsProductId) || PRODUCTS[0];
    onAddToCart(product, product.weight, product.price, 1);
    
    setAddedNotice(recipe.id);
    setTimeout(() => setAddedNotice(null), 1800);
  };

  return (
    <section id="receitas" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <span className="text-xs font-bold text-[#1A472A] uppercase tracking-wider block mb-1">
            👨‍🍳 Criatividade na Cozinha
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#133821] tracking-tight font-heading">
            Receitas Rápidas com Peniel Chips
          </h2>
          <p className="text-sm text-[#4E5E52] mt-1 max-w-xl">
            Surpreenda suas visitas! Descubra pratos fáceis em que a banana chips brilha como ingrediente nobre, trazendo crocância e contraste doce-salgado.
          </p>
        </div>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {RECIPES.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setActiveRecipe(recipe)}
            className="group bg-white rounded-2xl border border-[#E5DECF] overflow-hidden hover:border-[#C4BAA9] hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Recipe Image */}
              <div className="relative aspect-[4/3] bg-[#FAF7F2] overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-1 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#F2B824]" />
                  <span>{recipe.prepTime}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2 text-[11px] text-[#78887D] font-medium mb-1.5">
                  <span>Dificuldade: {recipe.difficulty}</span>
                  <span>·</span>
                  <span>{recipe.servings}</span>
                </div>

                <h3 className="font-bold text-base text-[#1C241E] leading-snug group-hover:text-[#1A472A] transition-colors mb-1">
                  {recipe.title}
                </h3>

                <p className="text-xs text-[#526055] line-clamp-2 leading-relaxed mb-3">
                  {recipe.subtitle}
                </p>

                <div className="p-2.5 bg-[#FAF7F2] rounded-xl text-[11px] text-[#334237] border border-[#EBE4D6]">
                  <strong className="text-[#1A472A] block mb-0.5">Usa na receita:</strong>
                  <span className="line-clamp-1">{recipe.chipsUsed}</span>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="p-4 sm:p-5 pt-0 border-t border-[#F0EAE0] mt-2 space-y-2">
              <button
                onClick={(e) => handleAddChipsForRecipe(recipe, e)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  addedNotice === recipe.id
                    ? 'bg-[#15803D] text-white'
                    : 'bg-[#FAF7F2] hover:bg-[#1A472A] hover:text-white text-[#1A472A] border border-[#D5CCBA]'
                }`}
              >
                {addedNotice === recipe.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#F2B824]" />
                    <span>Chips adicionado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Comprar chips da receita</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-[#1A472A] font-semibold pt-1">
                <span>Ver modo de preparo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {activeRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D5CCBA] p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveRecipe(null)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-[#FAF7F2] text-[#4A574E] p-2 rounded-full border border-[#DDD5C5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#8C6D1F] uppercase tracking-wider">
                  Receita Exclusiva Peniel
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#133821] font-heading mt-1">
                  {activeRecipe.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#46544A] mt-1">
                  {activeRecipe.subtitle}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 py-3 border-y border-[#EFEAE0] text-xs font-medium text-[#4B5A50]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#1A472A]" />
                  <span>Preparo: <strong>{activeRecipe.prepTime}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#1A472A]" />
                  <span>Rendimento: <strong>{activeRecipe.servings}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-[#1A472A]" />
                  <span>Nível: <strong>{activeRecipe.difficulty}</strong></span>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="text-sm font-bold text-[#1F2722] uppercase tracking-wider mb-2">
                  Ingredientes:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#3C4B40]">
                  {activeRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#1A472A] font-bold">·</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step by step */}
              <div>
                <h4 className="text-sm font-bold text-[#1F2722] uppercase tracking-wider mb-2">
                  Modo de Preparo:
                </h4>
                <ol className="space-y-2 text-xs sm:text-sm text-[#3C4B40]">
                  {activeRecipe.instructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#1A472A] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Sommelier Tip */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#EBE4D6] text-xs">
                <strong className="text-[#1A472A] block mb-1">
                  🍷 Dica de Harmonização para esta receita:
                </strong>
                <p className="text-[#516155]">{activeRecipe.pairingTip}</p>
              </div>

              {/* Add to Cart CTA */}
              <div className="pt-3">
                <button
                  onClick={() => {
                    handleAddChipsForRecipe(activeRecipe);
                    setActiveRecipe(null);
                  }}
                  className="w-full py-3.5 bg-[#1A472A] hover:bg-[#133821] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#F2B824]" />
                  <span>Adicionar Chips Desta Receita ao Meu Carrinho</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
