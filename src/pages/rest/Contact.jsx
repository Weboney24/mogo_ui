import { Button, Checkbox, Form, Input } from "antd";
import HeaderHelper from "../../customerSideUI/Home/HeaderHelper";
import { IconHelper } from "../../helper/IconHelper";

const Contact = () => {
  return (
    <div className="pt-10 w-full px-4 md:px-8 lg:px-16 font-Poppins pb-2">
      <HeaderHelper first_name={"Contact"} second_name={"US"} />
      <br />
      <div className="w-full">
        <p className="!font-serif">
          We are here to help you with any questions, concerns, or feedback you
          may have about our platform. Whether you are a buyer or a customer,
          our team is dedicated to providing you with the best possible support.
          If you need assistance with an order, have questions about our
          platform, or simply want to provide feedback, please don&apos;t hesitate to
          contact us. You can reach us through our contact form, located on this
          page. Simply fill out the form with your details and a brief message,
          and we will get back to you as soon as possible.
        </p>
        <p className="py-4 !font-serif">
          Alternatively, you can also reach us through our social media channels
          or email. Our team is available to assist you with any questions or
          concerns you may have.
        </p>
      </div>

      <div className="py-10 flex flex-col lg:flex-row items-start gap-x-10 gap-y-10 lg:gap-y-0">
        <Form className="w-full lg:w-1/2 space-y-5">
          <Form.Item>
            <Input placeholder="Name" className="!antd_input" />
          </Form.Item>
          <Form.Item>
            <Input placeholder="Email" className="!antd_input" />
          </Form.Item>
          <Form.Item>
            <Input placeholder="Message" className="!antd_input !h-[100px]" />
          </Form.Item>
          <div className="flex items-center gap-x-2">
            <Checkbox />
            &nbsp; I have read and agree to the
            <p className="text-secondary cursor-pointer">Terms & Conditions</p>
          </div>
          <Form.Item>
            <Button className="!antd_input">Submit</Button>
          </Form.Item>
        </Form>

        <div className="w-full lg:w-1/2 !font-serif !lining-nums space-y-5">
          <div className="flex items-center gap-x-2">
            <IconHelper.CALL_ICON /> <p>73730 02299</p>
          </div>
          <div className="flex items-center gap-x-2">
            <IconHelper.MAIL_ICON /> <p>support@mogo.com</p>
          </div>
          <div className="flex items-center gap-x-2">
            <IconHelper.deliveryLocation />{" "}
            <p>3111 Camino Del Rio N Suite 400 San Diego</p>
          </div>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1002720.3266519235!2d77.301242584949!3d10.972710320366822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1smogo!5e0!3m2!1sen!2sin!4v1735884483650!5m2!1sen!2sin"
        className="w-full h-[500px] mt-10"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Contact;
