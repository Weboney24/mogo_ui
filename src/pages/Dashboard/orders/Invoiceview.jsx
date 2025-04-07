import { ImageHelper } from "../../../helper/ImageHelper";

const Invoiceview = () => {
  return (
    <div className="w-screen min-h-screen bg-light_gray center_div !font-Poppins">
      <div className="w-[80%] min-h-screen bg-white">
        <h1 className="py-10 text-2xl text-center">Invoice</h1>
        {/* mogo info */}
        <div className="w-full flex items-start justify-between px-10 gap-x-20  py-10">
          <div className="invoice_heading">
            <img src={ImageHelper.Logo} alt="" className="w-[120px]" />
            <address className="pt-2 line-clamp-10 w-[90%]">
              3111 Camino Del Rio N Suite 400 San Diego
            </address>
            <h1>73730 02299</h1>
            <h1>support@mogo.com</h1>
          </div>
          <div className="invoice_heading items-start ">
            <div>
              <h1>Invoice : HUE&KUJK66</h1>
              <h1>Date : 02/04/2023 </h1>
            </div>
          </div>
        </div>
        {/* billing info */}
        <div className="w-full flex items-start justify-between px-10 gap-x-20  py-10">
          <div className="invoice_heading">
            <h1 className="font-Poppins text-black">Billing Address</h1>
            <address className="pt-2 line-clamp-2">
              3111 Camino Del Rio N Suite 400 San Diego
            </address>
            <h1>73730 02299</h1>
            <h1>support@mogo.com</h1>
          </div>
          <div className="invoice_heading !gap-y-2">
            <h1 className="font-Poppins text-black text-start">
              Payment Details
            </h1>
            <h1>Payment Status: &nbsp; Awaiting Payment</h1>
            <h1>Payment Method: &nbsp; Cash on Delivery</h1>
            <h1>Currency: INR</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoiceview;
