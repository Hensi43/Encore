"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function AdminPanel() {
    const [secret, setSecret] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

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

    // Auto-Refresh Effect (Existing)
    useEffect(() => {
        if (!isAuthenticated) return;

        const interval = setInterval(fetchUsers, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [isAuthenticated, secret]);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/users?secret=${secret}`);
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users);
                setIsAuthenticated(true);
                localStorage.setItem('admin_secret', secret); // Save to local storage
            } else {
                alert('Invalid Admin Secret');
            }
        } catch (error) {
            alert('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
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
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-cinzel text-gold">Encore 26 Registrations</h1>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 border border-green-500/30">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-green-400 font-mono">LIVE</span>
                        </div>
                    </div>
                    <Button variant="ghost" onClick={() => {
                        setIsAuthenticated(false);
                        localStorage.removeItem('admin_secret');
                    }}>Logout</Button>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/10 text-gold font-cinzel">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">College</th>
                                    <th className="p-4">Year</th>
                                    <th className="p-4">Accomm.</th>
                                    <th className="p-4">Payment ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/5">
                                        <td className="p-4 font-bold">{user.name}</td>
                                        <td className="p-4 text-gray-400">{user.email}</td>
                                        <td className="p-4 text-gray-400">{user.phone || '-'}</td>
                                        <td className="p-4 text-gray-400">{user.college || '-'}</td>
                                        <td className="p-4 text-gray-400">{user.year || '-'}</td>
                                        <td className="p-4 text-gray-400 uppercase">{user.accommodation || 'NO'}</td>
                                        <td className="p-4 font-mono text-xs text-green-400">{user.paymentId || 'PENDING'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="text-gray-500 mt-4 text-sm mb-8">Total Registrations: {users.length}</p>

                {/* Add CA Section */}
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
                                    alert(`CA Created! \nCode: ${data.code} \nEmail this code to them.`);
                                    form.reset();
                                } else {
                                    alert(data.error || 'Failed');
                                }
                            } catch (err) {
                                alert("Error");
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
