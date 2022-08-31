import { Modal } from 'react-bootstrap'

type Props = {
	open: boolean
	onClose: () => void
	confirmationInfo: any
	handleConfirmationMessage: (confirm: boolean, confirmationInfo: any) => void
}

const ConfirmationModal = ({ open = false, onClose, handleConfirmationMessage, confirmationInfo }: Props) => {
	return (
		<>
			<Modal
				show={open}
				onHide={onClose}
				centered
			>
				<div className="modal-content bg-gray-200">
					<div className="modal-header">
						{confirmationInfo.action === 'error' ? <h2 className="fw-bolder">Error</h2> :
							<h2 className="fw-bolder">{confirmationInfo.action === 'alert' ? 'Alert' : 'Confirmation'}</h2>
						}
						<button type='button' className="btn btn-icon btn-sm btn-active-icon-primary" onClick={onClose}>
							<span className="svg-icon svg-icon-1">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px">
									<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
									<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
								</svg>
							</span>
						</button>
					</div>
					<div className="modal-body scroll-y mx-3">
						<h4>{confirmationInfo.message}</h4>
					</div>
					<div className="modal-footer">
						{confirmationInfo && confirmationInfo.action && confirmationInfo.action !== 'error' && confirmationInfo.action !== 'alert' &&
							(<button type='button' className="btn btn-secondary btn-sm" onClick={() => handleConfirmationMessage(true, confirmationInfo)}>
								Ok
							</button>)}
						<button type='button' className="btn btn-light btn-sm" onClick={() => handleConfirmationMessage(false, confirmationInfo)}>
							Close
						</button>
					</div>
				</div>
			</Modal>


		</>
	)
}

export default ConfirmationModal