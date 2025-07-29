export default function Auth() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md p-6 border rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-md"
                            placeholder="your.email@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded-md"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}