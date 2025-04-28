"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { CategorySchemaType } from "@/schemas/categorySchema";
import { TechnologySchemaType } from "@/schemas/technologySchema";

import { AddCategoryForm } from "@/components/category/AddCategoryForm";
import { AddTechnologyForm } from "@/components/technology/AddTechnologyForm";

export type Category = CategorySchemaType & { id: string };
export type Technology = TechnologySchemaType & { id: string };

export default function ReferentielsPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [loadingCat, setLoadingCat] = useState(true);
    const [loadingTech, setLoadingTech] = useState(true);
    const [errorCat, setErrorCat] = useState<string | null>(null);
    const [errorTech, setErrorTech] = useState<string | null>(null);

    const [createCatOpen, setCreateCatOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const [createTechOpen, setCreateTechOpen] = useState(false);
    const [editingTech, setEditingTech] = useState<Technology | null>(null);

    const [deleteCatOpen, setDeleteCatOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const [deleteTechOpen, setDeleteTechOpen] = useState(false);
    const [technologyToDelete, setTechnologyToDelete] = useState<Technology | null>(null);

    useEffect(() => {
        async function loadAll() {
            try {
                const res = await fetch("/api/category");
                if (!res.ok) throw new Error((await res.json()).message);
                setCategories(await res.json());
            } catch (err: any) {
                setErrorCat(err.message);
            } finally {
                setLoadingCat(false);
            }
            try {
                const res = await fetch("/api/technology");
                if (!res.ok) throw new Error((await res.json()).message);
                setTechnologies(await res.json());
            } catch (err: any) {
                setErrorTech(err.message);
            } finally {
                setLoadingTech(false);
            }
        }
        loadAll();
    }, []);

    const handleCreateCategory = async (data: CategorySchemaType) => {
        const res = await fetch("/api/category", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const payload = await res.json();
        if (!res.ok) {
            toast.error(payload.message);
            return;
        }
        setCategories((prev) => [...prev, payload]);
        toast.success("Catégorie créée !");
        setCreateCatOpen(false);
    };

    const handleUpdateCategory = async (data: CategorySchemaType) => {
        if (!editingCategory) return;
        const res = await fetch(`/api/category/${editingCategory.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const payload = await res.json();
        if (!res.ok) {
            toast.error(payload.message);
            return;
        }
        setCategories((prev) =>
            prev.map((c) => (c.id === payload.id ? payload : c))
        );
        toast.success("Catégorie mise à jour !");
        setEditingCategory(null);
    };

    const confirmDeleteCategory = (c: Category) => {
        setCategoryToDelete(c);
        setDeleteCatOpen(true);
    };

    const handleDeleteCategory = async () => {
        if (!categoryToDelete) return;
        const res = await fetch(`/api/category/${categoryToDelete.id}`, {
            method: "DELETE",
        });
        const payload = await res.json();
        if (!res.ok) {
            toast.error(payload.message);
        } else {
            setCategories((prev) =>
                prev.filter((c) => c.id !== categoryToDelete.id)
            );
            toast.success("Catégorie supprimée !");
        }
        setDeleteCatOpen(false);
        setCategoryToDelete(null);
    };

    const handleCreateTech = async (data: TechnologySchemaType) => {
        const res = await fetch("/api/technology", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const payload = await res.json();
        if (!res.ok) {
            toast.error(payload.message);
            return;
        }
        setTechnologies((prev) => [...prev, payload]);
        toast.success("Technologie créée !");
        setCreateTechOpen(false);
    };

    const handleUpdateTech = async (data: TechnologySchemaType) => {
        if (!editingTech) return;
        const res = await fetch(`/api/technology/${editingTech.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const payload = await res.json();
        if (!res.ok) {
            toast.error(payload.message);
            return;
        }
        setTechnologies((prev) =>
            prev.map((t) => (t.id === payload.id ? payload : t))
        );
        toast.success("Technologie mise à jour !");
        setEditingTech(null);
    };

    const confirmDeleteTech = (t: Technology) => {
        setTechnologyToDelete(t);
        setDeleteTechOpen(true);
    };

    const handleDeleteTech = async () => {
        if (!technologyToDelete) return;
        const res = await fetch(`/api/technology/${technologyToDelete.id}`, {
            method: "DELETE",
        });
        const payload = await res.json();
        if (!res.ok) {
            toast.error(payload.message);
        } else {
            setTechnologies((prev) =>
                prev.filter((t) => t.id !== technologyToDelete.id)
            );
            toast.success("Technologie supprimée !");
        }
        setDeleteTechOpen(false);
        setTechnologyToDelete(null);
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between px-4 py-2">
                <div>
                    <h1 className="text-2xl font-bold">Référentiels</h1>
                    <p className="text-gray-500">Gérez vos référentiels ici.</p>
                </div>
                <div className="flex space-x-2">
                    <Dialog open={createCatOpen} onOpenChange={setCreateCatOpen}>
                        <DialogTrigger asChild>
                            <Button>Nouvelle catégorie</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Nouvelle catégorie</DialogTitle>
                                <DialogDescription>Créez une catégorie.</DialogDescription>
                            </DialogHeader>
                            <AddCategoryForm onSubmit={handleCreateCategory} />
                        </DialogContent>
                    </Dialog>

                    <Dialog open={createTechOpen} onOpenChange={setCreateTechOpen}>
                        <DialogTrigger asChild>
                            <Button>Nouvelle technologie</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Nouvelle technologie</DialogTitle>
                                <DialogDescription>Créez une technologie.</DialogDescription>
                            </DialogHeader>
                            <AddTechnologyForm onSubmit={handleCreateTech} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <section className="px-4 py-2">
                <h2 className="text-xl font-semibold mb-2">Catégories</h2>
                {loadingCat ? (<p>Chargement…</p>) : errorCat ? (<p className="text-red-600">Erreur : {errorCat}</p>) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                {["Nom", "Actions"].map((h) => (
                                    <th
                                        key={h}
                                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((c) => (
                                <tr key={c.id}>
                                    <td className="px-4 py-3">{c.name}</td>
                                    <td className="px-4 py-3 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onSelect={() => setEditingCategory(c)}>
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => confirmDeleteCategory(c)}>
                                                    Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <Dialog open={!!editingCategory} onOpenChange={(o) => !o && setEditingCategory(null)}>
                <DialogContent className="sm-max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Modifier catégorie</DialogTitle>
                        <DialogDescription>Mettez à jour la catégorie.</DialogDescription>
                    </DialogHeader>
                    {editingCategory && (
                        <AddCategoryForm
                            initialData={editingCategory}
                            onSubmit={handleUpdateCategory}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Dialog
                open={deleteCatOpen}
                onOpenChange={(o) => !o && setDeleteCatOpen(false)}
            >
                <DialogContent className="sm-max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Supprimer la catégorie ?</DialogTitle>
                        <DialogDescription>
                            Cette action est irréversible.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteCatOpen(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteCategory}
                        >
                            <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <section className="px-4 py-2">
                <h2 className="text-xl font-semibold mb-2">Technologies</h2>
                {loadingTech ? (<p>Chargement…</p>) : errorTech ? (<p className="text-red-600">Erreur : {errorTech}</p>) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                {["Nom", "Actions"].map((h) => (
                                    <th
                                        key={h}
                                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {technologies.map((t) => (
                                <tr key={t.id}>
                                    <td className="px-4 py-3">{t.name}</td>
                                    <td className="px-4 py-3 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onSelect={() => setEditingTech(t)}>Modifier</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => confirmDeleteTech(t)}>Supprimer</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <Dialog open={!!editingTech} onOpenChange={(o) => !o && setEditingTech(null)}>
                <DialogContent className="sm-max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Modifier technologie</DialogTitle>
                        <DialogDescription>
                            Mettez à jour la technologie.
                        </DialogDescription>
                    </DialogHeader>
                    {editingTech && (
                        <AddTechnologyForm initialData={editingTech} onSubmit={handleUpdateTech}/>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog
                open={deleteTechOpen}
                onOpenChange={(o) => !o && setDeleteTechOpen(false)}
            >
                <DialogContent className="sm-max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Supprimer la technologie ?</DialogTitle>
                        <DialogDescription>
                            Cette action est irréversible.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteTechOpen(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteTech}
                        >
                            <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
