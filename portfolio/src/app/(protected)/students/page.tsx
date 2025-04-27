"use client";

import {useEffect, useState} from "react";
import AddStudentForm from "@/components/student/AddStudentForm";
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
import {StudentSchemaType} from "@/schemas/studentSchema";

export type Student = StudentSchemaType & { id: string };

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [createOpen, setCreateOpen] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/students");
                if (!res.ok) {
                    throw new Error((await res.json()).message);
                }
                setStudents(await res.json());
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const handleCreate = async (data: StudentSchemaType) => {
        const res = await fetch("/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const payload = await res.json();
        if (!res.ok) {
            alert(`Erreur : ${payload.message}`);
            return;
        }
        setStudents((prev) => [...prev, payload]);
        setCreateOpen(false);
    };

    const handleUpdate = async (data: StudentSchemaType) => {
        if (!editingStudent) return;
        const res = await fetch(`/api/students/${editingStudent.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const payload = await res.json();
        if (!res.ok) {
            alert(`Erreur : ${payload.message}`);
            return;
        }
        setStudents((prev) =>
            prev.map((s) => (s.id === payload.id ? payload : s))
        );
        setEditingStudent(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer cet étudiant ?")) return;
        const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
        const payload = await res.json();
        if (!res.ok) {
            alert(`Erreur : ${payload.message}`);
            return;
        }
        setStudents((prev) => prev.filter((s) => s.id !== id));
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-2">
                <div>
                    <h1 className="text-2xl font-bold">Étudiants</h1>
                    <p className="text-gray-500">Gérez vos étudiants ici.</p>
                </div>
                <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>Nouveau étudiant</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Nouveau étudiant</DialogTitle>
                            <DialogDescription>
                                Ajoutez un étudiant en remplissant le formulaire.
                            </DialogDescription>
                        </DialogHeader>
                        <AddStudentForm onSubmit={handleCreate} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="px-4 py-2">
                {loading ? (<p>Chargement…</p>) : error ? (<p className="text-red-600">Erreur : {error}</p>) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                {["Prénom", "Nom", "Email", "Promotion", "Actions"].map((h) => (
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
                            {students.map((s) => (
                                <tr key={s.id}>
                                    <td className="px-4 py-3">{s.firstName}</td>
                                    <td className="px-4 py-3">{s.lastName}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {s.email}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {s.promotion}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onSelect={() => setEditingStudent(s)}>
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleDelete(s.id)}>
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
            </div>

            <Dialog
                open={!!editingStudent}
                onOpenChange={(o) => !o && setEditingStudent(null)}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Modifier étudiant</DialogTitle>
                        <DialogDescription>
                            Mettez à jour les informations de l'étudiant.
                        </DialogDescription>
                    </DialogHeader>
                    {editingStudent && (
                        <AddStudentForm
                            initialData={editingStudent}
                            onSubmit={handleUpdate}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
