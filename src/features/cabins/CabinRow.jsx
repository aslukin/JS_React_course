import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import Spinner from '../../ui/Spinner';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

/*
const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;
*/
const ImgContainer = styled.div`
    font-size: 0.75rem;
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
    text-align: right;
`;

const Discount = styled.div`
    text-align: right;
    font-family: 'Sono';

    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
    const { isDeleting: isLoading, deleteCabin } = useDeleteCabin();
    const { isInsertPending, insertMutate: createCabin } = useCreateCabin();

    if (isLoading || isInsertPending) return <Spinner />;

    return (
        <Table.Row>
            <ImgContainer>
                <Img src={cabin.image} alt={cabin.description} />
            </ImgContainer>
            <Cabin>{cabin.name}</Cabin>
            <div> up to {cabin.maxCapacity}</div>
            <Price>{formatCurrency(cabin.regularPrice)}</Price>
            {cabin.discount ? (
                <Discount>{formatCurrency(cabin.discount)}</Discount>
            ) : (
                <Discount>&mdash;</Discount>
            )}
            <ButtonGroup>
                {/* <Button
                    size='small'
                    title='Duplicate record'
                    onClick={() => {
                        createCabin({
                            name: `Copy of ${cabin.name}`,
                            maxCapacity: cabin.maxCapacity,
                            regularPrice: cabin.regularPrice,
                            discount: cabin.discount,
                            description: cabin.description,
                            image: cabin.image,
                        });
                    }}
                >
                    <HiSquare2Stack />
                </Button> */}
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={cabin.id} />

                        <Menus.List id={cabin.id}>
                            <Menus.Button
                                icon={<HiSquare2Stack />}
                                onClick={() => {
                                    createCabin({
                                        name: `Copy of ${cabin.name}`,
                                        maxCapacity: cabin.maxCapacity,
                                        regularPrice: cabin.regularPrice,
                                        discount: cabin.discount,
                                        description: cabin.description,
                                        image: cabin.image,
                                    });
                                }}
                            >
                                Duplicate
                            </Menus.Button>

                            <Modal.Open opensWindowName='editCabinWindow'>
                                <Menus.Button icon={<HiPencil />}>
                                    Edit
                                </Menus.Button>
                            </Modal.Open>

                            <Modal.Open opensWindowName='confirmDeleteCabin'>
                                <Menus.Button icon={<HiTrash />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                    </Menus.Menu>

                    <Modal.Window name='editCabinWindow'>
                        <CreateCabinForm cabinToEdit={cabin} />
                    </Modal.Window>
                    <Modal.Window name='confirmDeleteCabin'>
                        <ConfirmDelete
                            resourceName={`Cabin ${cabin.name}`}
                            disabled={isLoading}
                            onConfirm={() => deleteCabin(cabin.id)}
                        />
                    </Modal.Window>
                </Modal>
            </ButtonGroup>
        </Table.Row>
    );
}

export default CabinRow;
