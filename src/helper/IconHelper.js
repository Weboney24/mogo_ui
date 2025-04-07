import { SiHomeassistantcommunitystore, SiScrollreveal } from "react-icons/si";
import { FaLayerGroup, FaStore, FaUserEdit, FaWpexplorer } from "react-icons/fa";
import { MdEditNote, MdOutlineArrowBackIos, MdOutlineViewTimeline, MdPayment } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { IoIosMail, IoMdAdd } from "react-icons/io";
import { TbCategory, TbDownload } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";

import { RxCross1, RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { CgDisplayFullwidth } from "react-icons/cg";
import { BiSolidOffer } from "react-icons/bi";
import { IoCallSharp, IoCartOutline, IoFolderOpenOutline } from "react-icons/io5";
import { RiExternalLinkLine } from "react-icons/ri";
import { CiHeart, CiLocationOn } from "react-icons/ci";
import { FcConferenceCall, FcGallery, FcGenealogy, FcLandscape, FcMoneyTransfer, FcPositiveDynamic, FcPuzzle, FcShipped, FcShop, FcStackOfPhotos } from "react-icons/fc";
import { GiClothes, GiClothesline, GiLoincloth, GiPathDistance, GiRolledCloth } from "react-icons/gi";
import { multiply } from "lodash";
import { AiOutlineHeart, AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { WiTime8 } from "react-icons/wi";

export const IconHelper = {
  VendorIcon: SiHomeassistantcommunitystore,
  productIcon: FcStackOfPhotos,
  categoryIcon: FcGenealogy,
  orderIcon: BsCart4,
  viewIcon: HiOutlineViewfinderCircle,
  plusIcon: IoMdAdd,
  catIocn: TbCategory,
  subCatIcons: GiClothes,
  dashboardIcon: FcPositiveDynamic,
  menuOpenIcon: RxHamburgerMenu,
  uploadIcon: MdOutlineFileUpload,
  DeleteIcon: MdOutlineDelete,
  displayGroup: FcLandscape,
  OffersIcon: BiSolidOffer,
  BannerIcon: FcGallery,
  BackIcon: MdOutlineArrowBackIos,
  featuredIcons: FaWpexplorer,
  newArivals: MdOutlineViewTimeline,
  linkIcon: RiExternalLinkLine,
  EditIcon: MdEditNote,
  couponIcon: FcPuzzle,
  paymentIcon: MdPayment,
  cardIcons: IoCartOutline,
  HeartIcon: AiOutlineHeart,
  storeIcon: FcShop,
  deliveryIcon: FcShipped,
  deliveryLocation: GiPathDistance,
  moneyIcon: FcMoneyTransfer,
  profileIcon: FaUserEdit,
  fabricIcon: GiRolledCloth,
  brandIcon: GiLoincloth,
  productCatIcon: GiClothesline,
  multiplyIcon: RxCross1,
  customerIcon: FcConferenceCall,
  crossIcon: RxCross2,
  FOLDER_ICON: IoFolderOpenOutline,
  TIME_ICON: WiTime8,
  MAIL_ICON: IoIosMail,
  CALL_ICON: IoCallSharp,
  ROUNDED_OUTLINE_LEFTARROW: AiOutlineLeftCircle,
  ROUNDED_OUTLINE_RIGHTARROW: AiOutlineRightCircle,
  DOWNLOAD_ICON: TbDownload,
};
