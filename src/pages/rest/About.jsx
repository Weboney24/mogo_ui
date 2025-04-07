import HeaderHelper from "../../customerSideUI/Home/HeaderHelper";

const About = () => {
  return (
    <div className=" pt-10 w-screen px-4 md:px-8 lg:px-16 font-Poppins pb-10">
      <HeaderHelper first_name={"About"} second_name={"US"} />
      <br />
      <div className="w-full">
        <p className="!font-serif">Welcome to Mogo! The Founder is Mr. Mohan Kumar., Mogo is a dynamic and innovative e-commerce platform that connects people from all over the world. We are committed to providing users with a seamless and enjoyable shopping experience. Our platform is designed to make shopping easy and hassle-free. Whether you're looking for the latest fashion trends, beauty products, or home and garden items, Mogo offers a wide range of categories to suit every need. Our team of experts works hard to ensure access to the best products and services. We maintain the highest standards of quality, safety, and reliability, constantly monitoring our site to ensure all listings meet our guidelines and remain free from fraud and scams. At Mogo, we believe in the power of community. We strive to create a platform where users can connect and build long-lasting relationships. Our community includes individuals from all walks of life who share a passion for great products and exceptional service. To enhance the experience, we offer a range of tools and features that make shopping on our platform simple. Our user-friendly interface is intuitive and easy to navigate, helping you find what you're looking for quickly and efficiently.</p>
      </div>
    </div>
  );
};

export default About;
