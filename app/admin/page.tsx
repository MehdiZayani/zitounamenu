"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Save,
  Check,
  X,
  LogOut,
  ExternalLink,
  Shield,
  Key,
  Layers,
  ShoppingBag,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface Category {
  id: string;
  slug: string;
  label: string;
  subtitle?: string;
  order: number;
  _count?: { products: number };
}

interface Product {
  id: string;
  title: string;
  price: string;
  description: string;
  extra?: string | null;
  side: string;
  order: number;
  isAvailable: boolean;
  categoryId: string;
  category?: {
    id: string;
    slug: string;
    label: string;
  };
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ id: string; username: string } | null>(null);

  // Data state
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Inline price edits
  const [priceDrafts, setPriceDrafts] = useState<{ [id: string]: string }>({});
  const [savingPriceId, setSavingPriceId] = useState<string | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Form states for Add Product
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newExtra, setNewExtra] = useState("");
  const [newSide, setNewSide] = useState("left");
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // 1. Authenticate user
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setCurrentUser(data.user);
        loadData();
      } catch {
        router.push("/admin/login");
      }
    }
    checkAuth();
  }, [router]);

  // 2. Load Categories and Products
  const loadData = async () => {
    setLoading(true);
    try {
      const [catsRes, prodsRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/admin/products"),
      ]);

      if (catsRes.ok) {
        const catsData = await catsRes.json();
        setCategories(catsData.categories || []);
        if (catsData.categories?.length > 0 && !newCategoryId) {
          setNewCategoryId(catsData.categories[0].id);
        }
      }

      if (prodsRes.ok) {
        const prodsData = await prodsRes.json();
        setProducts(prodsData.products || []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
      showToast("Erreur de chargement des données", "error");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  // Price draft change
  const handlePriceDraftChange = (productId: string, val: string) => {
    setPriceDrafts((prev) => ({ ...prev, [productId]: val }));
  };

  // Save inline price
  const handleSavePrice = async (product: Product) => {
    const draft = priceDrafts[product.id];
    if (draft === undefined || draft.trim() === product.price) return;

    setSavingPriceId(product.id);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: draft.trim() }),
      });

      if (!res.ok) throw new Error("Erreur de sauvegarde");

      const data = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, price: data.product.price } : p))
      );
      setPriceDrafts((prev) => {
        const updated = { ...prev };
        delete updated[product.id];
        return updated;
      });
      showToast(`Prix de "${product.title}" mis à jour : ${data.product.price} DT`);
    } catch {
      showToast("Échec de mise à jour du prix", "error");
    } finally {
      setSavingPriceId(null);
    }
  };

  // Toggle availability
  const handleToggleAvailability = async (product: Product) => {
    const newStatus = !product.isAvailable;
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: newStatus }),
      });
      if (!res.ok) throw new Error("Erreur de modification");
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, isAvailable: newStatus } : p))
      );
      showToast(
        newStatus
          ? `"${product.title}" est maintenant disponible`
          : `"${product.title}" est marqué épuisé`
      );
    } catch {
      showToast("Erreur de modification du statut", "error");
    }
  };

  // Add Product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice.trim() || !newCategoryId) {
      showToast("Veuillez remplir les champs obligatoires", "error");
      return;
    }

    setFormSubmitting(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          price: newPrice.trim(),
          categoryId: newCategoryId,
          description: newDescription.trim(),
          extra: newExtra.trim(),
          side: newSide,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur de création");
      }

      const data = await res.json();
      setProducts((prev) => [data.product, ...prev]);
      setIsAddModalOpen(false);
      setNewTitle("");
      setNewPrice("");
      setNewDescription("");
      setNewExtra("");
      showToast(`Produit "${data.product.title}" ajouté avec succès !`);
    } catch (err: any) {
      showToast(err.message || "Impossible d'ajouter le produit", "error");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Update Product (Full Edit)
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setFormSubmitting(true);
    try {
      const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingProduct.title,
          price: editingProduct.price,
          description: editingProduct.description,
          extra: editingProduct.extra,
          categoryId: editingProduct.categoryId,
          side: editingProduct.side,
          isAvailable: editingProduct.isAvailable,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur de mise à jour");
      }

      const data = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? data.product : p))
      );
      setEditingProduct(null);
      showToast(`Produit "${data.product.title}" mis à jour !`);
    } catch (err: any) {
      showToast(err.message || "Impossible de mettre à jour le produit", "error");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    setFormSubmitting(true);
    try {
      const res = await fetch(`/api/admin/products/${productToDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erreur de suppression");

      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      showToast(`Produit "${productToDelete.title}" supprimé.`);
      setProductToDelete(null);
    } catch {
      showToast("Impossible de supprimer le produit", "error");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword !== confirmPassword) {
      setPasswordError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.error || "Erreur lors du changement.");
        return;
      }

      setPasswordSuccess("Mot de passe changé avec succès !");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setPasswordSuccess(null);
      }, 1500);
    } catch {
      setPasswordError("Erreur serveur.");
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" || p.categoryId === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.extra && p.extra.toLowerCase().includes(q)) ||
        (p.category?.label && p.category.label.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a150c] text-[#eedab7] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-3 border-[#c9782b] border-t-transparent rounded-full animate-spin mb-4" />
        <p
          style={{ fontFamily: "'LaLuxes', serif", letterSpacing: "0.15em" }}
          className="text-xl text-[#eedab7]"
        >
          Chargement du menu...
        </p>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: "LaLuxes";
          src: url("/fonts/LaLuxes.otf") format("opentype");
        }
        @font-face {
          font-family: "zoxi-regular";
          src: url("/fonts/zoxi-regular.ttf") format("truetype");
        }
        @font-face {
          font-family: "Myriad Pro";
          src: url("/fonts/MYRIADPRO-REGULAR.OTF") format("opentype");
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div
        className="min-h-screen w-full text-[#eedab7] font-sans antialiased relative"
        style={{
          backgroundImage: "url('/coffee/boissons-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark emerald veil covering whole page */}
        <div className="absolute inset-0 bg-[#0a150c]/88 pointer-events-none" />

        {/* Content container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Toast Notification */}
          {toast && (
            <div className="fixed bottom-6 right-6 z-50 animate-bounce">
              <div
                className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border ${
                  toast.type === "success"
                    ? "bg-[#102014]/95 border-emerald-500/60 text-emerald-200"
                    : "bg-red-950/95 border-red-500/60 text-red-200"
                } backdrop-blur-md`}
              >
                {toast.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
                <span
                  style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                  className="text-sm font-medium"
                >
                  {toast.message}
                </span>
              </div>
            </div>
          )}

          {/* Top Navbar */}
          <header className="sticky top-0 z-30 bg-[#0e1c11]/90 border-b border-[#eedab7]/20 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              {/* Brand Logo & Title */}
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 drop-shadow-md">
                  <Image
                    src="/logozitouna.png"
                    alt="Zitouna"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1
                    style={{
                      fontFamily: "'LaLuxes', serif",
                      color: "#eedab7",
                      letterSpacing: "0.15em",
                      lineHeight: "1.1",
                    }}
                    className="text-2xl font-bold tracking-wider m-0"
                  >
                    ZITOUNA
                  </h1>
                  <span
                    style={{
                      fontFamily: "'zoxi-regular', serif",
                      color: "#c9782b",
                      letterSpacing: "0.08em",
                      lineHeight: "1",
                    }}
                    className="text-base block"
                  >
                    Administration
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-[#eedab7]/20 hover:bg-white/10 hover:border-[#eedab7]/50 text-xs text-[#eedab7] transition"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#c9782b]" />
                  <span
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="hidden sm:inline font-medium"
                  >
                    Voir Menu Client
                  </span>
                </Link>

                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-[#eedab7]/20 hover:bg-white/10 hover:border-[#eedab7]/50 text-xs text-[#eedab7] transition cursor-pointer"
                  title="Changer mot de passe"
                >
                  <Key className="w-3.5 h-3.5 text-[#c9782b]" />
                  <span
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="hidden sm:inline font-medium"
                  >
                    Sécurité
                  </span>
                </button>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-500/30 hover:bg-red-900/50 text-xs text-red-200 transition cursor-pointer"
                  title="Se déconnecter"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="hidden sm:inline"
                  >
                    Déconnexion
                  </span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1 w-full">
            {/* Metric Cards Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#102014]/90 border border-[#eedab7]/25 rounded-2xl p-5 flex items-center justify-between shadow-xl backdrop-blur-sm">
                <div>
                  <p
                    style={{ fontFamily: "'Myriad Pro', sans-serif", color: "#c9782b" }}
                    className="text-xs uppercase tracking-wider font-semibold"
                  >
                    Total Produits
                  </p>
                  <h3
                    style={{ fontFamily: "'LaLuxes', serif", color: "#eedab7" }}
                    className="text-3xl font-bold mt-1"
                  >
                    {products.length}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#eedab7]/10 border border-[#eedab7]/30 flex items-center justify-center text-[#c9782b]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#102014]/90 border border-[#eedab7]/25 rounded-2xl p-5 flex items-center justify-between shadow-xl backdrop-blur-sm">
                <div>
                  <p
                    style={{ fontFamily: "'Myriad Pro', sans-serif", color: "#c9782b" }}
                    className="text-xs uppercase tracking-wider font-semibold"
                  >
                    Catégories
                  </p>
                  <h3
                    style={{ fontFamily: "'LaLuxes', serif", color: "#eedab7" }}
                    className="text-3xl font-bold mt-1"
                  >
                    {categories.length}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#eedab7]/10 border border-[#eedab7]/30 flex items-center justify-center text-[#c9782b]">
                  <Layers className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#102014]/90 border border-[#eedab7]/25 rounded-2xl p-5 flex items-center justify-between shadow-xl backdrop-blur-sm">
                <div>
                  <p
                    style={{ fontFamily: "'Myriad Pro', sans-serif", color: "#c9782b" }}
                    className="text-xs uppercase tracking-wider font-semibold"
                  >
                    En Stock
                  </p>
                  <h3
                    style={{ fontFamily: "'LaLuxes', serif", color: "#eedab7" }}
                    className="text-3xl font-bold mt-1"
                  >
                    {products.filter((p) => p.isAvailable).length}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#eedab7]/10 border border-[#eedab7]/30 flex items-center justify-center text-[#c9782b]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Action & Filter Bar */}
            <div className="bg-[#102014]/90 border border-[#eedab7]/25 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#eedab7]/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un plat, ingrédient..."
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] placeholder-[#eedab7]/40 focus:outline-none focus:border-[#c9782b] transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#eedab7]/60 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Add Product Button */}
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  style={{
                    fontFamily: "'LaLuxes', serif",
                    letterSpacing: "0.12em",
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c9782b] to-[#b0651e] text-[#0f1e12] font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>NOUVEAU PRODUIT</span>
                </button>
              </div>

              {/* Category Horizontal Navigation */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                <button
                  onClick={() => setSelectedCategory("all")}
                  style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs transition cursor-pointer ${
                    selectedCategory === "all"
                      ? "bg-[#c9782b] text-[#0f1e12] font-bold shadow-md"
                      : "bg-[#0a150c]/80 text-[#eedab7]/80 hover:bg-[#18301e] hover:text-[#eedab7] border border-[#eedab7]/20"
                  }`}
                >
                  Toutes ({products.length})
                </button>

                {categories.map((cat) => {
                  const count = products.filter((p) => p.categoryId === cat.id).length;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs whitespace-nowrap transition cursor-pointer ${
                        isSelected
                          ? "bg-[#c9782b] text-[#0f1e12] font-bold shadow-md"
                          : "bg-[#0a150c]/80 text-[#eedab7]/80 hover:bg-[#18301e] hover:text-[#eedab7] border border-[#eedab7]/20"
                      }`}
                    >
                      {cat.label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Table */}
            <div className="bg-[#102014]/90 border border-[#eedab7]/25 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
              <div className="p-4 sm:p-5 border-b border-[#eedab7]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2
                    style={{
                      fontFamily: "'LaLuxes', serif",
                      color: "#eedab7",
                      letterSpacing: "0.12em",
                    }}
                    className="text-2xl font-bold m-0"
                  >
                    PRODUITS
                  </h2>
                  <span
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-[#c9782b]/20 text-[#c9782b] font-medium border border-[#c9782b]/30"
                  >
                    {filteredProducts.length} affichés
                  </span>
                </div>

                <span
                  style={{ fontFamily: "'Myriad Pro', sans-serif", color: "#eedab7" }}
                  className="text-xs opacity-75 hidden sm:inline"
                >
                  💡 Modifiez le prix en tapant la valeur puis validez avec <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-[#eedab7]/30">Entrée</kbd> ou ✓
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center text-[#eedab7]/60">
                  <ShoppingBag className="w-12 h-12 mx-auto stroke-1 mb-3 text-[#c9782b]" />
                  <p
                    style={{ fontFamily: "'LaLuxes', serif" }}
                    className="text-xl text-[#eedab7]"
                  >
                    Aucun produit trouvé
                  </p>
                  <p
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="text-xs opacity-60 mt-1"
                  >
                    Modifiez vos critères de recherche ou ajoutez un nouveau plat.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr
                        style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                        className="bg-[#0a150c]/60 border-b border-[#eedab7]/15 text-[11px] uppercase tracking-wider text-[#c9782b] font-bold"
                      >
                        <th className="py-3.5 px-4">Plat / Boisson</th>
                        <th className="py-3.5 px-4">Catégorie</th>
                        <th className="py-3.5 px-4 w-44">Prix (DT)</th>
                        <th className="py-3.5 px-4 text-center">Disponibilité</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eedab7]/10">
                      {filteredProducts.map((product) => {
                        const currentDraft = priceDrafts[product.id];
                        const isDraftDirty =
                          currentDraft !== undefined &&
                          currentDraft.trim() !== product.price;
                        const isSaving = savingPriceId === product.id;

                        return (
                          <tr
                            key={product.id}
                            className={`hover:bg-[#142819]/50 transition ${
                              !product.isAvailable ? "opacity-60" : ""
                            }`}
                          >
                            {/* Title & Description */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <span
                                  style={{
                                    fontFamily: "'LaLuxes', serif",
                                    color: "#eedab7",
                                    letterSpacing: "0.08em",
                                    fontSize: "17px",
                                  }}
                                >
                                  {product.title}
                                </span>
                                {product.extra && (
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#c9782b]/20 border border-[#c9782b]/40 text-[#c9782b] font-mono">
                                    {product.extra}
                                  </span>
                                )}
                              </div>
                              {product.description && (
                                <p
                                  style={{
                                    fontFamily: "'Myriad Pro', sans-serif",
                                    color: "#eedab7",
                                  }}
                                  className="text-xs opacity-75 mt-0.5 max-w-md line-clamp-1"
                                >
                                  {product.description}
                                </p>
                              )}
                            </td>

                            {/* Category */}
                            <td className="py-3.5 px-4">
                              <span
                                style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                                className="inline-block px-2.5 py-1 rounded-md text-xs bg-[#0a150c]/80 border border-[#eedab7]/20 text-[#c9782b]"
                              >
                                {product.category?.label || "Général"}
                              </span>
                            </td>

                            {/* Inline Price Editing */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="text"
                                  value={currentDraft ?? product.price}
                                  onChange={(e) =>
                                    handlePriceDraftChange(product.id, e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSavePrice(product);
                                  }}
                                  style={{
                                    fontFamily: "'LaLuxes', serif",
                                    fontSize: "16px",
                                  }}
                                  className={`w-24 px-2.5 py-1 rounded-lg bg-[#0a150c]/90 border transition ${
                                    isDraftDirty
                                      ? "border-[#c9782b] ring-1 ring-[#c9782b] text-[#c9782b]"
                                      : "border-[#eedab7]/30 text-[#eedab7] focus:border-[#c9782b]"
                                  }`}
                                />
                                {isDraftDirty && (
                                  <button
                                    onClick={() => handleSavePrice(product)}
                                    disabled={isSaving}
                                    title="Sauvegarder le nouveau prix"
                                    className="p-1.5 rounded-lg bg-[#c9782b] hover:bg-[#b0651e] text-[#0f1e12] cursor-pointer shadow transition"
                                  >
                                    {isSaving ? (
                                      <div className="w-3.5 h-3.5 border-2 border-[#0f1e12] border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    )}
                                  </button>
                                )}
                              </div>
                            </td>

                            {/* Status Toggle */}
                            <td className="py-3.5 px-4 text-center">
                              <button
                                onClick={() => handleToggleAvailability(product)}
                                style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition cursor-pointer border ${
                                  product.isAvailable
                                    ? "bg-emerald-950/70 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60"
                                    : "bg-stone-900/80 border-stone-700 text-stone-400 hover:bg-stone-800"
                                }`}
                              >
                                {product.isAvailable ? "En stock" : "Épuisé"}
                              </button>
                            </td>

                            {/* Action buttons */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setEditingProduct(product)}
                                  title="Modifier le produit"
                                  className="p-1.5 rounded-lg text-[#eedab7]/70 hover:text-[#c9782b] hover:bg-white/5 transition cursor-pointer"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setProductToDelete(product)}
                                  title="Supprimer le produit"
                                  className="p-1.5 rounded-lg text-[#eedab7]/70 hover:text-red-400 hover:bg-red-950/30 transition cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Modal: Add Product */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#102014]/95 border border-[#eedab7]/30 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#eedab7]/20 pb-3">
                <h3
                  style={{ fontFamily: "'LaLuxes', serif", letterSpacing: "0.12em" }}
                  className="text-2xl font-bold text-[#eedab7] m-0"
                >
                  AJOUTER UN PRODUIT
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-[#eedab7]/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1.5 font-bold"
                  >
                    Nom du Plat / Boisson *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: CROISSANT POULET FUMÉ"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="w-full px-3.5 py-2.5 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1.5 font-bold"
                    >
                      Catégorie *
                    </label>
                    <select
                      value={newCategoryId}
                      onChange={(e) => setNewCategoryId(e.target.value)}
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="w-full px-3.5 py-2.5 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#102014] text-[#eedab7]">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1.5 font-bold"
                    >
                      Prix (DT) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ex: 18,500"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      style={{ fontFamily: "'LaLuxes', serif", fontSize: "16px" }}
                      className="w-full px-3.5 py-2.5 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1.5 font-bold"
                  >
                    Description / Ingrédients
                  </label>
                  <textarea
                    rows={2}
                    placeholder="ex: Sauce fromage, poulet fumé, emmental, pesto"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="w-full px-3.5 py-2 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1.5 font-bold"
                    >
                      Extra / Variante
                    </label>
                    <input
                      type="text"
                      placeholder="ex: Nespresso ou benedicte"
                      value={newExtra}
                      onChange={(e) => setNewExtra(e.target.value)}
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="w-full px-3.5 py-2.5 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                    />
                  </div>

                  <div>
                    <label
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1.5 font-bold"
                    >
                      Colonne Affichage
                    </label>
                    <select
                      value={newSide}
                      onChange={(e) => setNewSide(e.target.value)}
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="w-full px-3.5 py-2.5 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                    >
                      <option value="left" className="bg-[#102014] text-[#eedab7]">
                        Colonne Gauche
                      </option>
                      <option value="right" className="bg-[#102014] text-[#eedab7]">
                        Colonne Droite
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#eedab7]/20">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#eedab7]/60 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    style={{ fontFamily: "'LaLuxes', serif", letterSpacing: "0.1em" }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c9782b] to-[#b0651e] text-[#0f1e12] text-sm font-bold tracking-wide transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {formSubmitting ? (
                      <div className="w-3.5 h-3.5 border-2 border-[#0f1e12] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[3]" />
                    )}
                    <span>AJOUTER AU MENU</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit Product */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#102014]/95 border border-[#eedab7]/30 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#eedab7]/20 pb-3">
                <h3
                  style={{ fontFamily: "'LaLuxes', serif", letterSpacing: "0.12em" }}
                  className="text-2xl font-bold text-[#eedab7] m-0"
                >
                  MODIFIER LE PRODUIT
                </h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="text-[#eedab7]/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div>
                  <label
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1.5 font-bold"
                  >
                    Nom du Plat *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, title: e.target.value })
                    }
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="w-full px-3.5 py-2.5 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1.5 font-bold"
                    >
                      Catégorie
                    </label>
                    <select
                      value={editingProduct.categoryId}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, categoryId: e.target.value })
                      }
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="w-full px-3.5 py-2.5 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#102014] text-[#eedab7]">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1.5 font-bold"
                    >
                      Prix (DT) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: e.target.value })
                      }
                      style={{ fontFamily: "'LaLuxes', serif", fontSize: "16px" }}
                      className="w-full px-3.5 py-2.5 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1.5 font-bold"
                  >
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingProduct.description || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="w-full px-3.5 py-2 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1.5 font-bold"
                    >
                      Extra / Variante
                    </label>
                    <input
                      type="text"
                      value={editingProduct.extra || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, extra: e.target.value })
                      }
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="w-full px-3.5 py-2.5 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                    />
                  </div>

                  <div>
                    <label
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1.5 font-bold"
                    >
                      Statut Disponibilité
                    </label>
                    <select
                      value={editingProduct.isAvailable ? "true" : "false"}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          isAvailable: e.target.value === "true",
                        })
                      }
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      className="w-full px-3.5 py-2.5 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                    >
                      <option value="true" className="bg-[#102014] text-[#eedab7]">
                        En stock
                      </option>
                      <option value="false" className="bg-[#102014] text-[#eedab7]">
                        Épuisé
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#eedab7]/20">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#eedab7]/60 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    style={{ fontFamily: "'LaLuxes', serif", letterSpacing: "0.1em" }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c9782b] to-[#b0651e] text-[#0f1e12] text-sm font-bold tracking-wide transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {formSubmitting ? (
                      <div className="w-3.5 h-3.5 border-2 border-[#0f1e12] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>ENREGISTRER</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Delete Confirmation */}
        {productToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#102014]/95 border border-red-500/40 rounded-3xl w-full max-w-sm p-6 shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-950/70 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h4
                  style={{ fontFamily: "'LaLuxes', serif", letterSpacing: "0.1em" }}
                  className="text-xl font-bold text-[#eedab7]"
                >
                  CONFIRMER LA SUPPRESSION
                </h4>
                <p
                  style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                  className="text-xs text-[#eedab7]/70 mt-1"
                >
                  Êtes-vous sûr de vouloir supprimer définitivement &quot;{productToDelete.title}&quot; ?
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProductToDelete(null)}
                  style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#eedab7]/60 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  disabled={formSubmitting}
                  onClick={handleDeleteProduct}
                  style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide transition cursor-pointer disabled:opacity-50"
                >
                  {formSubmitting ? "Suppression..." : "Supprimer"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Change Password */}
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#102014]/95 border border-[#eedab7]/30 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#eedab7]/20 pb-3">
                <h3
                  style={{ fontFamily: "'LaLuxes', serif", letterSpacing: "0.12em" }}
                  className="text-2xl font-bold text-[#eedab7] flex items-center gap-2 m-0"
                >
                  <Key className="w-5 h-5 text-[#c9782b]" />
                  <span>CHANGER LE MOT DE PASSE</span>
                </h3>
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="text-[#eedab7]/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {passwordError && (
                <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs">
                  {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs">
                  {passwordSuccess}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-3.5">
                <div>
                  <label
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1 font-bold"
                  >
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="w-full px-3.5 py-2 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                  />
                </div>

                <div>
                  <label
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1 font-bold"
                  >
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Au moins 6 caractères"
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="w-full px-3.5 py-2 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                  />
                </div>

                <div>
                  <label
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="block text-xs uppercase tracking-wider text-[#c9782b] mb-1 font-bold"
                  >
                    Confirmer nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Répétez le nouveau mot de passe"
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="w-full px-3.5 py-2 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-sm text-[#eedab7] focus:outline-none focus:border-[#c9782b]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#eedab7]/20">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#eedab7]/60 hover:text-white"
                  >
                    Fermer
                  </button>
                  <button
                    type="submit"
                    style={{ fontFamily: "'LaLuxes', serif", letterSpacing: "0.1em" }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c9782b] to-[#b0651e] text-[#0f1e12] text-sm font-bold tracking-wide transition cursor-pointer"
                  >
                    METTRE À JOUR
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
