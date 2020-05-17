import React from 'react'


const $ = window.$;


const MAIN_MODAL = "mainModal"

export const toggleModal = (modal_id = MAIN_MODAL) => {

    const modal = '#' + modal_id

    const is_open = $(modal).hasClass('show');
    if (is_open) {
        $(modal).modal('hide');
    } else {
        $(modal).modal({
            backdrop: 'static',
            keyboard: false
        });
    }

}

export default (props) => {

    const {
        modal_id,
        title,
        action_btn_title,
        action_btn_color = "primary",
        large_modal,
        action,
        show_progress_bar,
        close_btn,
        cancelModal,
        disabled,
    } = props;

    return (
        <>
            <div className="modal fade" id={modal_id || MAIN_MODAL} tabIndex="-1" role="dialog" aria-labelledby="mainModalLabel" aria-hidden="true">
                <div 
                className={`modal-dialog modal-dialog-centered ${large_modal}`}

                role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="mainModalLabel">{title}</h5>
                            <button
                                disabled={show_progress_bar}
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        {/* {!show_progress_bar ? */}
                        <div
                            className="modal-body"
                            disabled={disabled}>
                            {
                                props.children
                                
                            }
                        </div>
                        {/* : ""
                         } */}


                        <div className="modal-footer">

                            {
                                close_btn ?
                                    <button
                                        disabled={show_progress_bar}
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal">Close</button>
                                    : ''

                            }


                            <button
                                disabled={show_progress_bar}
                                type="button"
                                className={`btn btn-${action_btn_color}`}
                                data-dismiss={cancelModal}
                                onClick={() => {
                                    if (action) {
                                        action()
                                    }
                                }}
                            >
                                {
                                    show_progress_bar
                                    &&
                                    <div className="spinner-border spinner-border-sm text-dark" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                }
                                {
                                    !show_progress_bar
                                    &&
                                    action_btn_title
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
