import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import api from '../../services/api';

import './styles.css';

export default class New extends Component {
    state = {
        name: '',
        lastName: '',
        genre: '',
        birthday: '',
        email: '',
        modalIsOpen: false,
        erros: {
            name: ''
        }
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    toggleModal() {
        this.setState({ modalIsOpen: !this.state.modalIsOpen });
    };

    nameChange = e => {
        if (e.target.value === '')
        {
            this.setState({ name: e.target.value, erros: { name: "The 'Name' field is required." } });
        } else
        {
            this.setState({ name: e.target.value, erros: { name: '' } });
        }
    };

    async CreatRecord(obj) {
        await api.post(`/person`, obj);
    }

    canBeSubmitted() {
        const { name, lastName, birthday, email } = this.state;

        return (
            name.length > 0 &&
            lastName.length > 0 &&
            birthday.length > 0 &&
            email.length > 0
        );
    };

    handleSubimit = e => {
        e.preventDefault();

        if (!this.canBeSubmitted()) { return; }

        if (this.state.name === '')
        {
            this.setState({
                erros: { name: "The 'Name' field is required." }
            });
            console.log(this.state.erros.name);
            return;
        };

        const obj = {
            name: this.state.name,
            lastName: this.state.lastName,
            genre: this.state.genre,
            birthday: this.state.birthday,
            email: this.state.email,
        };
    
        this.CreatRecord(obj)

        this.setState({ 
            modalIsOpen: true,
            name: '',
            lastName: '',
            genre: '',
            birthday: '',
            email: '',
            erros: {
                name: ''
            }
        });
    };

    render () {
        const isEnabled = this.canBeSubmitted();

        return (
            <Container id="new" fluid={true}>

                <Modal isOpen={this.state.modalIsOpen}>
                    <ModalHeader toggle={this.toggleModal.bind(this)}>Sucess</ModalHeader>
                    <ModalBody>The record was created with sucess!</ModalBody>
                    <ModalFooter>
                        <button className="btn btn-sm btn-success" onClick={this.toggleModal.bind(this)}>Ok</button>
                    </ModalFooter>
                </Modal>

                <Link className="btn btn-sm btn-block btn-new-record" to={'/'}>Home</Link>

                <div id="new-content">
                    <Row>
                        <Col>
                            <h3>New Record</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input 
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={this.nameChange}
                                        value={this.state.name}
                                    />
                                    <span onChange={this.handleChange}>{this.state.erros.name}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="lastName">Last Name</Label>
                                    <Input 
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        onChange={this.handleChange}
                                        value={this.state.lastName}
                                    />
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form>
                                <FormGroup>
                                    <Label for="genre">Genre</Label>
                                    <Input 
                                        type="select"
                                        name="genre"
                                        id="genre"
                                        onChange={this.handleChange}
                                        value={this.state.genre}>
                                            <option></option>
                                            <option>F</option>
                                            <option>M</option>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col>
                            <Form>
                                <FormGroup>
                                    <Label for="birthday">Birthday</Label>
                                    <Input 
                                        type="date"
                                        name="birthday"
                                        id="birthday"
                                        onChange={this.handleChange}
                                        value={this.state.birthday}
                                        />
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input 
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                    />
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Row id="new-actions">
                        <Col>
                            <div className="botao">
                            <button className="btn btn-sm btn-success" disabled={!isEnabled} onClick={this.handleSubimit}>Creat</button>
                            <Link className="btn btn-sm btn-danger" to={'/'}>Cancel</Link>
                        </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    };
};