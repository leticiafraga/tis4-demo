import style from "./modal.module.scss";

interface Props {
  closeModal: () => void;
  confirm: () => void;
  message: string;
}

export function Modal(props: Props) {
  return (
    <>
      <div
        onClick={props.closeModal}
        className="modal-backdrop fade show"
      ></div>
      <div
        className="modal fade show text-center"
        tabIndex={-1}
        role="dialog"
        style={{ display: "block" }}
        onClick={props.closeModal}
      >
        <div
          className={"modal-dialog " + style.modalDialog}
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className={"modal-body " + style.modalBody}>
              <h3 className="mb-5">{props.message}</h3>
              <button
                type="button"
                className={"btn btn-outline-primary me-5 " + style.btnModal}
                data-dismiss="modal"
                onClick={props.closeModal}
              >
                Cancelar
              </button>
              <button
                type="button"
                className={"btn btn-primary " + style.btnModal}
                onClick={props.confirm}
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
