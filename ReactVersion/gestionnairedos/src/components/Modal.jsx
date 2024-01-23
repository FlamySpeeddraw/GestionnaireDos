export const Modal = ({isOpen,onClose,onAnnulate,onValidate,children}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
                <div className="button-modal-container">
                    <button autoFocus onClick={onAnnulate}>Annuler</button>
                    <button onClick={onValidate}>Valider</button>
                </div>
            </div>
        </div>
    );
}