import React from 'react'

function CustomModal() {
    return (
        <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
            <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
            <ModalBody className='px-sm-5 pt-50 pb-5'>
                <div className='text-center mb-2'>
                    <h1 className='mb-1'>Edit User Information</h1>
                    <p>Updating user details will receive a privacy audit.</p>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='gy-1 pt-75'>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='firstName'>
                                First Name
                            </Label>
                            <Controller
                                defaultValue=''
                                control={control}
                                id='firstName'
                                name='firstName'
                                render={({ field }) => (
                                    <Input {...field} id='firstName' placeholder='John' invalid={errors.firstName && true} />
                                )}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='lastName'>
                                Last Name
                            </Label>
                            <Controller
                                defaultValue=''
                                control={control}
                                id='lastName'
                                name='lastName'
                                render={({ field }) => (
                                    <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastName && true} />
                                )}
                            />
                        </Col>
                        <Col xs={12}>
                            <Label className='form-label' for='username'>
                                Username
                            </Label>
                            <Controller
                                defaultValue=''
                                control={control}
                                id='username'
                                name='username'
                                render={({ field }) => (
                                    <Input {...field} id='username' placeholder='john.doe.007' invalid={errors.username && true} />
                                )}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='billing-email'>
                                Billing Email
                            </Label>
                            <Input
                                type='email'
                                id='billing-email'
                                defaultValue={selectedUser.email}
                                placeholder='example@domain.com'
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='status'>
                                Status:
                            </Label>
                            <Select
                                id='status'
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={statusOptions}
                                theme={selectThemeColors}
                                defaultValue={statusOptions[statusOptions.findIndex(i => i.value === selectedUser.status)]}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='tax-id'>
                                Tax ID
                            </Label>
                            <Input
                                id='tax-id'
                                placeholder='Tax-1234'
                                defaultValue={selectedUser.contact.substr(selectedUser.contact.length - 4)}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='contact'>
                                Contact
                            </Label>
                            <Input id='contact' defaultValue={selectedUser.contact} placeholder='+1 609 933 4422' />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='language'>
                                language
                            </Label>
                            <Select
                                id='language'
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={languageOptions}
                                theme={selectThemeColors}
                                defaultValue={languageOptions[0]}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='country'>
                                Country
                            </Label>
                            <Select
                                id='country'
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={countryOptions}
                                theme={selectThemeColors}
                                defaultValue={countryOptions[0]}
                            />
                        </Col>
                        <Col xs={12}>
                            <div className='d-flex align-items-center mt-1'>
                                <div className='form-switch'>
                                    <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                                    <Label className='form-check-label' htmlFor='billing-switch'>
                                        <span className='switch-icon-left'>
                                            <Check size={14} />
                                        </span>
                                        <span className='switch-icon-right'>
                                            <X size={14} />
                                        </span>
                                    </Label>
                                </div>
                                <Label className='form-check-label fw-bolder' for='billing-switch'>
                                    Use as a billing address?
                                </Label>
                            </div>
                        </Col>
                        <Col xs={12} className='text-center mt-2 pt-50'>
                            <Button type='submit' className='me-1' color='primary'>
                                Submit
                            </Button>
                            <Button
                                type='reset'
                                color='secondary'
                                outline
                                onClick={() => {
                                    handleReset()
                                    setShow(false)
                                }}
                            >
                                Discard
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default CustomModal