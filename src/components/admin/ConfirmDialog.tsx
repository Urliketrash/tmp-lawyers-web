"use client";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = false
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-tmp-black border border-white/10 rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100 opacity-100">
        <div className="p-8 text-center">
            {/* Icon */}
            <div className={`mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center ${isDestructive ? 'bg-red-500/20 text-red-500' : 'bg-tmp-gold/20 text-tmp-gold'}`}>
                <i className={`fas ${isDestructive ? 'fa-exclamation-triangle' : 'fa-info-circle'} text-3xl`}></i>
            </div>
            
            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3 font-serif italic">{title}</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">{message}</p>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
                <button 
                    onClick={onCancel}
                    className="px-6 py-3 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold min-w-[100px]"
                >
                    {cancelLabel}
                </button>
                <button 
                    onClick={onConfirm}
                    className={`px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-colors min-w-[100px] shadow-lg ${
                        isDestructive 
                        ? 'bg-red-600 text-white hover:bg-red-500 hover:shadow-red-900/50' 
                        : 'bg-tmp-gold text-black hover:bg-white hover:shadow-tmp-gold/50'
                    }`}
                >
                    {confirmLabel}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
