import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import CabinTable from './CabinTable';

/*
OLD_VERSION: IsOpen state is outside of the modal screen however modal dialog should controil this state inside 
function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpenModal((show) => !show)}>
                Add new cabin
            </Button>
            {isOpenModal && (
                <Modal onClose={() => setIsOpenModal(false)}>
                    <CreateCabinForm
                        onCloseModal={() => setIsOpenModal(false)}
                    />
                </Modal>
            )}
        </>
    );
}
*/

function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opensWindowName='cabin-form'>
                    <Button>Add new cabin</Button>
                </Modal.Open>
                <Modal.Window name='cabin-form'>
                    <CreateCabinForm />
                </Modal.Window>
                {/* Just as example another window implementation
            <Modal.Open opensWindowName='table'>
            <Button>Show Table</Button>
            </Modal.Open>
            <Modal.Window name='table'>
            <CabinTable />
        </Modal.Window> */}
            </Modal>
        </div>
    );
}

export default AddCabin;
