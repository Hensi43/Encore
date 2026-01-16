
"use client";

import { useState, useEffect, ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Trash2, Edit2, Save, X } from 'lucide-react';

export default function AdminPanel() {
    const [secret, setSecret] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    // Global Modal State (Success/Error messages)
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        title: string;
        message: string | ReactNode;
        type: "success" | "error" | "info" | "warning";
        onAction?: () => void;
        actionLabel?: string;
    }>({
        isOpen: false,
        title: "",
        message: "",
        type: "info"
    });

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        phone: '',
        college: '',
        year: '',
        accommodation: '',
        password: '' // New Password (Optional)
    });

    const fetchUsers = async () => {
        try {
            const res = await fetch(`/api/admin/users?secret=${secret}`);
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users);
            }
        } catch (error) {
            console.error("Auto-refresh failed", error);
        }
    };

    // Auto-Login Effect
    useEffect(() => {
        const storedSecret = localStorage.getItem('admin_secret');
        if (storedSecret && !isAuthenticated) {
            setSecret(storedSecret);
            // Verify stored secret
            fetch(`/api/admin/users?secret=${storedSecret}`)
                .then(res => {
                    if (res.ok) {
                        res.json().then(data => {
                            setUsers(data.users);
                            setIsAuthenticated(true);
                        });
                    }
                });
        }
    }, []);

    // Auto-Refresh Effect
    useEffect(() => {
        if (!isAuthenticated) return;
        // const interval = setInterval(fetchUsers, 5000); // Poll every 5 seconds
        // return () => clearInterval(interval);
    }, [isAuthenticated, secret]);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/users?secret=${secret}`);
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users);
                setIsAuthenticated(true);
                localStorage.setItem('admin_secret', secret);
            } else {
                setModalState({ isOpen: true, title: "Access Denied", message: "Invalid Admin Secret", type: "error" });
            }
        } catch (error) {
            setModalState({ isOpen: true, title: "Error", message: "Error connecting to server", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const [viewingScreenshot, setViewingScreenshot] = useState<string | null>(null);

    // --- Actions ---

    const handleVerifyUser = async (userId: string) => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    secret,
                    userId,
                    paymentVerified: true
                })
            });

            if (res.ok) {
                setModalState({ isOpen: true, title: "Verified", message: "User payment verified successfully!", type: "success" });
                fetchUsers();
            } else {
                setModalState({ isOpen: true, title: "Error", message: "Failed to verify user", type: "error" });
            }
        } catch (error) {
            setModalState({ isOpen: true, title: "Error", message: "Network error", type: "error" });
        }
    };

    const openEditModal = (user: any) => {
        setEditingUser(user);
        setEditForm({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            college: user.college || '',
            year: user.year || '',
            accommodation: user.accommodation || '',
            password: ''
        });
        setIsEditModalOpen(true);
    };

    const handleUpdateUser = async () => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    secret,
                    userId: editingUser.id,
                    ...editForm
                })
            });

            if (res.ok) {
                setModalState({ isOpen: true, title: "Success", message: "User Updated Successfully!", type: "success" });
                setIsEditModalOpen(false);
                fetchUsers(); // Refresh
            } else {
                setModalState({ isOpen: true, title: "Error", message: "Failed to update user", type: "error" });
            }
        } catch (error) {
            console.error("Update failed", error);
            setModalState({ isOpen: true, title: "Error", message: "Network error", type: "error" });
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("Are you sure you want to DELETE this user? This cannot be undone.")) return;

        try {
            const res = await fetch(`/api/admin/users?secret=${secret}&userId=${userId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setModalState({ isOpen: true, title: "Deleted", message: "User deleted successfully", type: "info" });
                fetchUsers();
            } else {
                setModalState({ isOpen: true, title: "Error", message: "Failed to delete user", type: "error" });
            }
        } catch (error) {
            setModalState({ isOpen: true, title: "Error", message: "Network error", type: "error" });
        }
    };


    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <Modal
                    isOpen={modalState.isOpen}
                    onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
                    title={modalState.title}
                    message={modalState.message}
                    type={modalState.type}
                />
                <div className="bg-white/10 p-8 rounded-xl border border-white/20 w-full max-w-md">
                    <h1 className="text-2xl font-cinzel text-gold mb-6 text-center">Admin Access</h1>
                    <input
                        type="password"
                        placeholder="Enter Admin Secret"
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white mb-4"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                    />
                    <Button onClick={handleLogin} className="w-full" disabled={loading}>
                        {loading ? 'Verifying...' : 'Access Panel'}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <Modal
                isOpen={modalState.isOpen}
                onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
                title={modalState.title}
                message={modalState.message}
                type={modalState.type}
            />

            {/* SCREENSHOT PREVIEW MODAL */}
            {viewingScreenshot && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setViewingScreenshot(null)}>
                    <div className="max-w-3xl w-full max-h-[90vh] relative">
                        <button onClick={() => setViewingScreenshot(null)} className="absolute -top-10 right-0 text-white hover:text-gold transition-colors">
                            <X size={32} />
                        </button>
                        <img src={viewingScreenshot} alt="Payment Proof" className="w-full h-full object-contain rounded-lg border border-white/20" />
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#111] border border-gold/40 rounded-xl p-6 w-full max-w-lg shadow-2xl relative">
                        <button onClick={() => setIsEditModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-cinzel text-gold mb-6">Edit User</h2>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-xs text-gray-500">Name</label>
                                <input
                                    className="w-full bg-black/50 border border-white/10 rounded p-2 text-white"
                                    value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Email</label>
                                <input
                                    className="w-full bg-black/50 border border-white/10 rounded p-2 text-white"
                                    value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">College</label>
                                <input
                                    className="w-full bg-black/50 border border-white/10 rounded p-2 text-white"
                                    value={editForm.college} onChange={e => setEditForm({ ...editForm, college: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Accommodation</label>
                                <select
                                    className="w-full bg-black/50 border border-white/10 rounded p-2 text-white"
                                    value={editForm.accommodation} onChange={e => setEditForm({ ...editForm, accommodation: e.target.value })}
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-4 mt-4">
                            <label className="text-sm font-bold text-gold mb-2 block">Reset Password</label>
                            <input
                                type="text"
                                className="w-full bg-red-900/10 border border-red-500/30 rounded p-2 text-white"
                                placeholder="Enter NEW Password"
                                value={editForm.password} onChange={e => setEditForm({ ...editForm, password: e.target.value })}
                            />
                            <p className="text-xs text-gray-500 mt-1">Leave blank to keep current password.</p>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleUpdateUser}>Save Changes</Button>
                        </div>

                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-cinzel text-gold">Encore 26 Admin</h1>
                        <span className="text-xs text-green-400 font-mono bg-green-900/30 px-2 py-1 rounded border border-green-500/30">LIVE</span>
                    </div>
                    <Button variant="ghost" onClick={() => { setIsAuthenticated(false); localStorage.removeItem('admin_secret'); }}>Logout</Button>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-8">
                    <div className="max-h-[60vh] overflow-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/10 text-gold font-cinzel sticky top-0 backdrop-blur-md">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">College</th>
                                    <th className="p-4">Paid</th>
                                    <th className="p-4">Events</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {users.map((user) => {
                                    const totalPaid = user.orders?.reduce((sum: number, order: any) => {
                                        return order.status === 'PAID' ? sum + order.totalAmount : sum;
                                    }, 0) || 0;

                                    // Registration Fee Logic
                                    const registrationFee = user.totalPaid || (user.accommodation === 'yes' ? 999 : 399);

                                    return (
                                        <tr key={user.id} className="hover:bg-white/5">
                                            <td className="p-4 font-medium">
                                                {user.name}
                                                <div className="text-[10px] text-gray-500">{user.paymentId || 'No IDs'}</div>
                                            </td>
                                            <td className="p-4 text-gray-400 text-sm">{user.email}</td>
                                            <td className="p-4 text-gray-400 text-sm">{user.college || '-'}</td>

                                            {/* Payment & Verification Status */}
                                            <td className="p-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-gold font-mono text-sm">₹{registrationFee}</span>
                                                    {user.paymentVerified ? (
                                                        <span className="text-xs text-green-400 bg-green-900/20 px-2 py-0.5 rounded w-fit">Verified</span>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-red-400 bg-red-900/20 px-2 py-0.5 rounded">Pending</span>
                                                            <button
                                                                onClick={() => handleVerifyUser(user.id)}
                                                                className="text-[10px] bg-green-600/20 text-green-400 border border-green-600/50 px-2 rounded hover:bg-green-600/30 transition-colors"
                                                            >
                                                                Verify
                                                            </button>
                                                        </div>
                                                    )}
                                                    {user.paymentScreenshot && (
                                                        <button
                                                            onClick={() => setViewingScreenshot(user.paymentScreenshot)}
                                                            className="text-[10px] text-blue-400 underline decoration-blue-400/30 hover:text-blue-300 w-fit"
                                                        >
                                                            View Screenshot
                                                        </button>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="p-4 flex gap-2">
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="p-2 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/20"
                                                    title="Edit User"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20"
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CA Section */}
                <div className="bg-gold/5 border border-gold/20 p-8 rounded-xl mb-12">
                    <h2 className="text-2xl font-cinzel text-gold mb-6">Onboard Campus Ambassador</h2>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const formData = new FormData(form);
                            const payload = Object.fromEntries(formData);
                            try {
                                const res = await fetch('/api/ca/register', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(payload)
                                });
                                const data = await res.json();
                                if (res.ok) {
                                    setModalState({
                                        isOpen: true,
                                        title: "Success",
                                        message: (
                                            <div className="text-center">
                                                <p>CA Generated Successfully!</p>
                                                <div className="my-6 p-4 bg-white/5 border border-gold/30 rounded-xl relative overflow-hidden group">
                                                    <div className="absolute inset-0 bg-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                                    <span className="relative text-gray-400 text-xs uppercase tracking-widest block mb-1">Referral Code</span>
                                                    <strong className="relative text-gold text-4xl font-cinzel tracking-widest drop-shadow-md">{data.code}</strong>
                                                </div>
                                            </div>
                                        ),
                                        type: "success"
                                    });
                                    form.reset();
                                } else {
                                    setModalState({ isOpen: true, title: "Error", message: data.error || 'Failed', type: "error" });
                                }
                            } catch (err) {
                                setModalState({ isOpen: true, title: "Error", message: "Unexpected error occurred", type: "error" });
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
                    >
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Name</label>
                            <input name="name" required className="w-full bg-black/50 border border-white/20 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Email</label>
                            <input name="email" type="email" required className="w-full bg-black/50 border border-white/20 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">College</label>
                            <input name="college" required className="w-full bg-black/50 border border-white/20 rounded p-2 text-white" />
                        </div>
                        <Button type="submit" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
                            Generate Code
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
