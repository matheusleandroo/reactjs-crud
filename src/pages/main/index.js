import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Moment from 'moment';

import './styles.css';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            peopleInfo: {},
            page: 1,
            modalIsOpen: false,
            modalConfirmationIsOpen: false,
            modalCancelIsOpen: false,
            modalId: undefined,
            modalName: undefined,
          };
    
        this.modalCanceled = this.modalCanceled.bind(this);
      }

    toggleModal(idPessoa, name) {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen,
            modalId: idPessoa,
            modalName: name,
        });
    }

    toggleModalConfirmation() {
        this.setState({
            modalConfirmationIsOpen: !this.state.modalConfirmationIsOpen
        });
    }
  
      toggleModalCancel() {
        this.setState({
            modalCancelIsOpen: !this.state.modalCancelIsOpen
        });
    }
  
      modalCanceled() {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen,
            modalCancelIsOpen: !this.state.modalCancelIsOpen
        });
    }
    
    componentDidMount() {
        this.loadPeople();
    }
    
    loadPeople = async (page = 1) => {
        const response = await api.get(`/person?page=${page}`);

        const { docs, ...peopleInfo } = response.data;

        this.setState({ people: docs, peopleInfo, page });

        window.scrollTo(0, 0);
    }

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadPeople(pageNumber);

    };

    nextPage = () => {
        const { page, peopleInfo } = this.state;

        if (page === peopleInfo.pages) return;

        const pageNumber = page + 1;

        this.loadPeople(pageNumber);
    };

    async DeletePerson(idPessoa) {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen,
            modalConfirmationIsOpen: !this.state.modalConfirmationIsOpen
        });

        await api.delete(`/person/${idPessoa}`);

        this.loadPeople();
      }

    render() {
        const { people, page, peopleInfo } = this.state;

        return (
            <div className="product-list">
                
                <Modal isOpen={this.state.modalIsOpen}>
                    <ModalHeader toggle={this.toggleModal.bind(this)}>Confirmation</ModalHeader>
                    <ModalBody><p>Are you sure you want to delete the record "<strong>{this.state.modalName}</strong>"?</p></ModalBody>
                    <ModalFooter>
                    <input type="submit" onClick={this.modalCanceled} className="btn btn-sm btn-danger" value="Cancel" />
                        <input type="submit" onClick={this.DeletePerson.bind(this, this.state.modalId)} className="btn btn-sm btn-success" value="Delete" />
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalConfirmationIsOpen}>
                    <ModalHeader toggle={this.toggleModalConfirmation.bind(this)}>Sucess</ModalHeader>
                    <ModalBody>Deleted with sucess!</ModalBody>
                    <ModalFooter>
                        <button className="btn btn-sm btn-success" onClick={this.toggleModalConfirmation.bind(this)}>Ok</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalCancelIsOpen}>
                    <ModalHeader toggle={this.toggleModalCancel.bind(this)}>Canceled</ModalHeader>
                    <ModalBody>Process canceled by user.</ModalBody>
                    <ModalFooter>
                        <button className="btn btn-sm btn-danger" onClick={this.toggleModalCancel.bind(this)}>Ok</button>
                    </ModalFooter>
                </Modal>

                <Link className="btn btn-sm btn-block btn-new-record" to={'/New'}>New Record</Link>

                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Previous</button>
                    <button disabled={page === peopleInfo.pages} onClick={this.nextPage}>Next</button>
                </div>

                {people.map(people => (
                    <div className="row" key={people._id}>
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{people.name} {people.lastName}</h5>

                                    <div className="form-person">
                                        <div className="form-group">
                                            <label>E-mail:</label>
                                            <input type="text" name="email" className="form-control" readOnly value={people.email} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Birthday:</label>
                                            <input type="text" name="birthday" className="form-control" readOnly value={Moment(people.birthday).format('YYYY/MM/DD')} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Genre:</label>
                                            <input type="text" name="genre" className="form-control" readOnly value={people.genre} onChange={this.handleChange} />
                                        </div>
                                    </div>

                                    <div className="botao">
                                        <Link className="btn btn-sm btn-secondary" to={`/edit/${people._id}`}>Edit</Link>
                                        <button className="btn btn-sm btn-danger" onClick={this.toggleModal.bind(this, people._id, people.name)}>Delete</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                ))}


                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Previous</button>
                    <button disabled={page === peopleInfo.pages} onClick={this.nextPage}>Next</button>
                </div>
            </div>
        )
    };
};