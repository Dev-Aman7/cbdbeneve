import {useState} from 'react'
import CheckoutLayout from '../components/Layouts/CheckoutLayout'
import Heading from '../components/Heading'
import TitleList from '../components/TitleList'
import AddressForm from '../components/AddressForm'
import Checkbox from '../components/form-components/Checkbox'
import Button from '../components/form-components/Button'
import Radio from '../components/form-components/Radio'
import { Steps, Modal } from 'antd'
import CheckoutInfo from '../components/checkout-tabs/CheckoutInfo'
import {addAddress} from '../redux/actions/address'
import { connect } from 'react-redux'
import checkAddressDuplicate from '../services/helpers/address'
import CheckoutShipping from '../components/checkout-tabs/CheckoutShipping'
import CheckoutPayment from '../components/checkout-tabs/CheckoutPayment'

const Checkout  = ({
    addAddress, user, ...props
}) => {
    const [activeAddress, setActiveAddress] = useState(1)
    const [currentStep, setCurrentStep] = useState(0)
    const [infoDetails, setInfoDetails] = useState({})
    const [mainAddress, setMainAddress] = useState(null)
    const [shipAddress, setShipAddress] = useState(null)
    const [shippingDetail, setShippingDetail] = useState(null)
    const [shippingSendData, setShippingSendData] = useState(null)
    const [isModal, setIsModal] = useState(false)
    const address = [
        {
            address: "125th St, New York, NY 10027, USA",
            id: 1
        },
        {
            address: "127th St, New York, NY 10027, USA",
            id: 2
        },
        {
            address: "165 Courtland St NE, Atlanta, GA 30303, USA",
            id: 3
        },
    ]
    const onInfoSubmit = (e, values, address, addressShip) => {
        console.log({
            e, values
        })
        const {
            email,
            email_ship,
            firstname,
            firstname_ship,
            lastname,
            lastname_ship,
            phone,
            phone_ship,
            sameShipping,
            saveaddress,
            saveaddress_ship,
            addressSelect,
            addressSelect_ship,
        } = values
        const addressA = {
            ...address,
            email,
            firstname,
            lastname,
            phone,
        }
        const addressB = {
            ...addressShip,
            email_ship,
            firstname_ship,
            lastname_ship,
            phone_ship,
        }
        const allAddresses  = props.address.address || []
        const idTime        = new Date().getTime();
        const userId        = user._id
        const newAddressA   = {
            ...addressA,
            id: idTime
        }
        const newAddressB   = {
            ...addressB,
            id: idTime + 10
        }
        const isDuplicateA  = checkAddressDuplicate(newAddressA, allAddresses)
        const isDuplicateB  = checkAddressDuplicate(newAddressB, allAddresses)
        if(saveaddress && saveaddress_ship){
            if(allAddresses.length < 1 || (!isDuplicateA && !isDuplicateB)){
                addAddress(userId, [newAddressA, newAddressB], props.address, allAddresses)
            }else if(!isDuplicateA){
                addAddress(userId, newAddressA, props.address, allAddresses)
            }else if(!isDuplicateB){
                addAddress(userId, newAddressA, props.address, allAddresses)
            }
        }else if(saveaddress){
            if(!isDuplicateA || allAddresses.length < 1){
                addAddress(userId, newAddressA, props.address, allAddresses)
            }
        }else if(saveaddress_ship){
            if(!isDuplicateB || allAddresses.length < 1){
                addAddress(userId, newAddressB, props.address, allAddresses)
            }
        }
        setInfoDetails({...values})
        setCurrentStep(1)
        setMainAddress(addressSelect || address)
        setShipAddress(addressSelect_ship || addressSelect || addressShip || address)
    }
    const onShippingSubmit = (e, values, shippingSendData) => {
        setShippingDetail(values)
        setCurrentStep(2)
        console.log({
            shippingSendData
        })
        setShippingSendData(shippingSendData)
    }
    const onPaymentSubmit = (e, values) => {
    }
    const onPaymentFail = (res)=> {
        console.log({
            res
        })
        setIsModal(true)
    }
    return (
        <CheckoutLayout>
            <div className="c-checkout">
                <Heading parentClass="c-checkout" versions={["default", "upper"]}>Checkout</Heading>
                <div className="c-checkout__nav-wrapper">
                    <Steps 
                        current={currentStep}
                    >
                        <Steps.Step title="Information" />
                        <Steps.Step title="Shipping" />
                        <Steps.Step title="Payment" />
                    </Steps>
                </div>
                <div className="c-checkout__main-wrapper">
                    {(currentStep === 0) && <CheckoutInfo oldValues={infoDetails} onSubmit={onInfoSubmit} />}
                    {(currentStep === 1) && <CheckoutShipping oldValues={shippingDetail} email={infoDetails.email} address={mainAddress} onSubmit={onShippingSubmit} />}
                    {(currentStep === 2) && <CheckoutPayment 
                        oldValues={null} 
                        email={infoDetails.email} 
                        onFailed={onPaymentFail}
                        shippingDetail={shippingDetail} 
                        address={mainAddress} 
                        shippingSendData={shippingSendData}
                        onSubmit={onPaymentSubmit} />}
                </div>
                {/* {address.length && <TitleList parentClass="c-checkout" versions={["sm-border"]} title="Shipping Information" >
                    {
                        address.map((el, i)=> <Radio key={i} checked={el.id === activeAddress} onChange={()=>setActiveAddress(el.id)} >{el.address}</Radio>)
                    }
                    
                </TitleList>} */}
                {!address.length && 
                    <>
                        <TitleList parentClass="c-checkout" versions={["sm-border"]} title="Shipping Information" >
                            <AddressForm />
                            <div className="col-12">
                                <Checkbox parentClass="c-checkout" versions={["gold"]} >Ship to the same adress</Checkbox>
                            </div>
                        </TitleList>
                        <TitleList parentClass="c-checkout" versions={["sm-border"]} title="Shipping Information" >
                            <AddressForm />
                        </TitleList>
                    </>
                }
                
                {/* <TitleList parentClass="c-checkout" versions={["sm-border"]} >
                    <div className="col-12">
                        <Button parentClass="c-checkout" theme="outline" versions={["block"]} >Continue to Shipping</Button>
                    </div>
                </TitleList> */}
            </div>
            <Modal 
                
                maskClosable={true}
                footer={null}
                onOk={()=> {
                    setIsModal(false)
                    window.location.href = "/"
                }} 
                onCancel={()=> {
                    setIsModal(false)
                    window.location.href = "/"
                }} 
                visible={isModal}>
                Order is Successfully Places
            </Modal>
        </CheckoutLayout>
    )
}

const mapStateToProps = state => ({
    address: state.address,
    user: state.user,
})
const mapActionToProps = {
    addAddress
}

export default connect(mapStateToProps, mapActionToProps)(Checkout)