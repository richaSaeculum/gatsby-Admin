import { useState, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { GlobalContext } from '../../context/Provider'

interface DeleteModalProps {
  comId: string
  parentId?: string
}

const DeleteModal = ({ comId, parentId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false)
  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)
  const globalStore: any = useContext(GlobalContext)

  return (
    <div>
      <div style={{ width: '100%' }} onClick={onOpenModal}>
        Delete
      </div>
      {/* <Modal open={open} onClose={onCloseModal} center>
        <h2>Are you sure?</h2>
        <p>Once you delete this comment it will be gone forever.</p>
        <div className='deleteBtns'>
          <button
            className='delete'
            onClick={async () => (
              await globalStore.onDelete(comId, parentId),
              globalStore.onDeleteAction &&
                (await globalStore.onDeleteAction({
                  comIdToDelete: comId,
                  parentOfDeleteId: parentId
                }))
            )}
          >
            Delete
          </button>
          <button className='cancel' onClick={onCloseModal}>
            Cancel
          </button>
        </div>
      </Modal> */}

      <Modal
        show={open}
        onHide={onCloseModal}
        centered
      >
        <div className="modal-content bg-gray-200">
          <div className="modal-header">
            <h2>Confirmation</h2>
            <button type='button' className="btn btn-icon btn-sm btn-active-icon-primary" onClick={onCloseModal}>
              <span className="svg-icon svg-icon-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px">
                  <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
                  <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
                </svg>
              </span>
            </button>
          </div>
          <div className="modal-body scroll-y mx-3">
            <h4>Are you sure want to delete this comment.</h4>
          </div>
          <div className="modal-footer">
            <button
              type='button'
              className="btn btn-secondary btn-sm"
              onClick={async () => (
                await globalStore.onDelete(comId, parentId),
                globalStore.onDeleteAction &&
                (await globalStore.onDeleteAction({
                  comIdToDelete: comId,
                  parentOfDeleteId: parentId
                }))
              )}>
              Delete
            </button>
            <button type='button' className="btn btn-light btn-sm" onClick={onCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>

    </div>
  )
}

export default DeleteModal
