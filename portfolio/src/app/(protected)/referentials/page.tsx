"use client";

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {MoreVertical} from "lucide-react";

import {CategorySchemaType} from "@/schemas/categorySchema";
import {TechnologySchemaType} from "@/schemas/technologySchema";

import {AddCategoryForm} from "@/components/category/AddCategoryForm";
import {AddTechnologyForm} from "@/components/technology/AddTechnologyForm";

export type Category = CategorySchemaType & { id: string };
export type Technology = TechnologySchemaType & { id: string };

export default function ReferentielsPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [loadingCat, setLoadingCat] = useState(true);
    const [loadingTech, setLoadingTech] = useState(true);
    const [errorCat, setErrorCat] = useState<string | null>(null);
    const [errorTech, setErrorTech] = useState<string | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editingTech, setEditingTech] = useState<Technology | null>(null);
    const [createCatOpen, setCreateCatOpen] = useState(false);
    const [createTechOpen, setCreateTechOpen] = useState(false);

    useEffect(() => {
        async function loadAll() {
            try {
                const res = await fetch("/api/category");
                if (!res.ok) {
                    throw new Error((await res.json()).message);
                }
                setCategories(await res.json());
            } catch (err: any) {
                setErrorCat(err.message);
            } finally {
                setLoadingCat(false);
            }

            try {
                const res = await fetch("/api/technology");
                if (!res.ok) {
                    throw new Error((await res.json()).message);
                }
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
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        const payload = await res.json();
        if (!res.ok) return alert(`Erreur : ${payload.message}`);
        setCategories((prev) => [...prev, payload]);
    };

    const handleUpdateCategory = async (data: CategorySchemaType) => {
        if (!editingCategory) return;
        const res = await fetch(`/api/category/${editingCategory.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        const payload = await res.json();
        if (!res.ok) return alert(`Erreur : ${payload.message}`);
        setCategories((prev) =>
            prev.map((c) => (c.id === payload.id ? payload : c))
        );
        setEditingCategory(null);
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer cette catégorie ?")) return;
        const res = await fetch(`/api/category/${id}`, {method: "DELETE"});
        const payload = await res.json();
        if (!res.ok) return alert(`Erreur : ${payload.message}`);
        setCategories((prev) => prev.filter((c) => c.id !== id));
    };

    const handleCreateTech = async (data: TechnologySchemaType) => {
        const res = await fetch("/api/technology", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        const payload = await res.json();
        if (!res.ok) return alert(`Erreur : ${payload.message}`);
        setTechnologies((prev) => [...prev, payload]);
    };

    const handleUpdateTech = async (data: TechnologySchemaType) => {
        if (!editingTech) return;
        const res = await fetch(`/api/technology/${editingTech.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        const payload = await res.json();
        if (!res.ok) return alert(`Erreur : ${payload.message}`);
        setTechnologies((prev) =>
            prev.map((t) => (t.id === payload.id ? payload : t))
        );
        setEditingTech(null);
    };

    const handleDeleteTech = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer cette technologie ?")) return;
        const res = await fetch(`/api/technology/${id}`, {method: "DELETE"});
        const payload = await res.json();
        if (!res.ok) return alert(`Erreur : ${payload.message}`);
        setTechnologies((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="flex flex-col">
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
                            <AddCategoryForm onSubmit={handleCreateCategory}/>
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
                            <AddTechnologyForm onSubmit={handleCreateTech}/>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <section className="px-4 py-2">
                <h2 className="text-xl font-semibold mb-2">Catégories</h2>
                {loadingCat ? (<p>Chargement…</p>) : errorCat ? (
                    <p className="text-red-600">Erreur : {errorCat}</p>) : (
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
                                    <td className="px-4 py-3 whitespace-nowrap">{c.name}</td>
                                    <td className="px-4 py-3 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onSelect={() => setEditingCategory(c)}>
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleDeleteCategory(c.id)}>
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

            <Dialog
                open={!!editingCategory}
                onOpenChange={(o) => !o && setEditingCategory(null)}
            >
                <DialogContent className="sm:max-w-[425px]">
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

            <section className="px-4 py-2">
                <h2 className="text-xl font-semibold mb-2">Technologies</h2>
                {loadingTech ? (<p>Chargement…</p>) : errorTech ? (<p className="text-red-600">Erreur : {errorTech}</p>
                ) : (
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
                                    <td className="px-4 py-3 whitespace-nowrap">{t.name}</td>
                                    <td className="px-4 py-3 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onSelect={() => setEditingTech(t)}>
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleDeleteTech(t.id)}>
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

            <Dialog
                open={!!editingTech}
                onOpenChange={(o) => !o && setEditingTech(null)}
            >
                <DialogContent className="sm-max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Modifier technologie</DialogTitle>
                        <DialogDescription>Mettez à jour la technologie.</DialogDescription>
                    </DialogHeader>
                    {editingTech && (
                        <AddTechnologyForm
                            initialData={editingTech}
                            onSubmit={handleUpdateTech}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}