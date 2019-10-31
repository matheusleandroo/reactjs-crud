import React from 'react';
import api from '../../services/api';
import './styles.css';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Moment from 'moment';

export default class Edit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          id: '',
          name: '',
          lastName: '',
          genre: '',
          birthday: '',
          email: '',
          modalIsOpen: false,
          modalConfirmationIsOpen: false,
          modalCancelIsOpen: false
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.modalCanceled = this.modalCanceled.bind(this);
    }

    toggleModal() {
      this.setState({
          modalIsOpen: !this.state.modalIsOpen
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
  
    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }
  
    handleSubmit(event) {
      this.setState({
        modalIsOpen: !this.state.modalIsOpen,
        modalConfirmationIsOpen: !this.state.modalConfirmationIsOpen
      });

      const obj = {
        id: this.state.id,
        name: this.state.name,
        lastName: this.state.lastName,
        genre: this.state.genre,
        birthday: this.state.birthday,
        email: this.state.email,
      };

      this.UpdateDb(obj)
    }

    async UpdateDb(obj) {
        await api.put(`/person/${obj.id}`, obj);
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/person/${id}`);

        this.setState({
          id: response.data._id,
          name: response.data.name,
          lastName: response.data.lastName,
          genre: response.data.genre,
          birthday: response.data.birthday,
          email: response.data.email,
         })
    };

    render() {
      return (

        <div className="container-fluid">

          <Modal isOpen={this.state.modalIsOpen}>
              <ModalHeader toggle={this.toggleModal.bind(this)}>Confirmation</ModalHeader>
              <ModalBody>Are you sure you want to update?</ModalBody>
              <ModalFooter>
                <input type="submit" onClick={this.modalCanceled} className="btn btn-sm btn-danger" value="Cancel" />
                <input type="submit" onClick={this.handleSubmit} className="btn btn-sm btn-success" value="Update" />
              </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalConfirmationIsOpen}>
              <ModalHeader toggle={this.toggleModalConfirmation.bind(this)}>Sucess</ModalHeader>
              <ModalBody>Update with sucess!</ModalBody>
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

          <Link className="btn btn-sm btn-block btn-new-record" to={'/'}>Home</Link>

          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Edition</h5>
                  
                    <div className="form-person">
                      <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Last Name:</label>
                        <input type="text" name="lastName" className="form-control" value={this.state.lastName} onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Genre:</label>
                        <input type="text" name="genre" className="form-control" value={this.state.genre} onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Birthday:</label>
                        <input type="date" name="birthday" className="form-control" placeholder={Moment(this.state.birthday).format('YYYY-MM-DD')} value={Moment(this.state.birthday).format('YYYY-MM-DD')} onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label>E-mail:</label>
                        <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} />
                      </div>
                      <div className="botao">
                        <Link className="btn btn-sm btn-danger" to={'/'}>Cancel</Link>
                        <button className="btn btn-sm btn-success" onClick={this.toggleModal.bind(this)}>Update</button>
                      </div>
                    </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      );
    }
  }