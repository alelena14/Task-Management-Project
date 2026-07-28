import {useEffect, useRef} from "react";
import { SidebarClose } from "lucide-react";

export function Sidebar({ open, onClose, children }) {
    const panelRef = useRef(null);

    // Esc closes
    useEffect(() => {
        if (!open) return;
        const handler = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, onClose]);

    return (
        <div
            className={`fixed inset-0 top-16 z-40 ${
                open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
            {/* backdrop — click outside closes */}
            <div className="absolute inset-0 " onClick={onClose} />

            <div
                ref={panelRef}
                className={`absolute right-0 top-0 border h-full w-full max-w-sm bg-[#f1f3fc] shadow-xl transition-transform duration-300 ease-out ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {children}
            </div>
        </div>
    );
}

export function SidebarHeader({ onClose, children }) {
    return (
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-gray-300">
            <div>{children}</div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <SidebarClose />
            </button>
        </div>
    );
}


export function InfoRow({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center justify-between py-2 text-sm">
          <span className="flex items-center gap-2 text-slate-400">
            <Icon size={14} /> {label}
          </span>
            <span className="text-slate-700 font-medium">{value}</span>
        </div>
    );
}


