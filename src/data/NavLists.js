import { PiStudentFill, PiStudentBold } from 'react-icons/pi';
import { IoIosAddCircle } from 'react-icons/io';
import { FaChalkboardTeacher, FaCalendar, FaLayerGroup, FaHotel, FaBus, FaPen, FaUpload } from 'react-icons/fa';
import { CiViewList } from 'react-icons/ci';
import { FaChalkboardUser, FaUserTie } from "react-icons/fa6";
import { BsCurrencyExchange, BsGraphUp } from "react-icons/bs";
import { IoBookSharp } from 'react-icons/io5';
import { MdAdminPanelSettings, MdOutlinePayments, MdEventAvailable } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import { RiSurveyFill, RiAdminFill } from "react-icons/ri";
import { GrSchedule, GrMoney } from "react-icons/gr";
import { HiDocumentReport, HiOutlineDocumentReport } from "react-icons/hi";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { AiOutlineSchedule, AiFillMoneyCollect } from "react-icons/ai";

const NavLists = [
    {
        displayTitle: "Students",
        icon: <PiStudentFill size={18} />,
        role: 'sub-admin',
        children: [
            {
                title: "View Students",
                icon: <CiViewList size={16} />,
                path: 'students'
            },
            {
                title: "Add Student",
                icon: <FiUserPlus size={16} />,
                path: 'students/add'
            },
            {
                title: "Bulk Upload",
                icon: <FaUpload size={16} />,
                path: 'students/upload'
            }
        ]
    },
    {
        displayTitle: "Teachers",
        icon: <FaChalkboardTeacher size={18} />,
        role: 'sub-admin',
        children: [
            {
                title: "View Teachers",
                icon: <CiViewList size={16} />,
                path: 'teachers'
            },
            {
                title: "Add Teacher",
                icon: <FiUserPlus size={16} />,
                path: 'teachers/add'
            }
        ]
    },
    {
        displayTitle: "Staff",
        icon: <FaUserTie size={18} />,
        role: 'sub-admin',
        children: [
            {
                title: "View Staffs",
                icon: <CiViewList size={16} />,
                path: 'staffs'
            },
            {
                title: "View Users",
                icon: <FiUsers size={16} />,
                path: 'staffs/users'
            },
            {
                title: "Add Staff",
                icon: <FiUserPlus size={16} />,
                path: 'staffs/add'
            }
        ]
    },
    {
        displayTitle: "Employee",
        icon: <FaUserTie size={18} />,
        role: 'admin',
        children: [
            {
                title: "View Employees",
                icon: <CiViewList size={16} />,
                path: 'employees'
            },
            {
                title: "Add Employees",
                icon: <FiUserPlus size={16} />,
                path: 'employees/add'
            }
        ]
    },
    {
        displayTitle: 'Attendance',
        icon: <MdEventAvailable size={18} />,
        role: 'sub-admin',
        children: [
            {
                title: "Student Attendance",
                icon: <PiStudentBold size={16} />,
                path: 's_attendance'
            }
        ]
    },
    {
        displayTitle: "Exams",
        icon: <FaPen size={18} />,
        role: 'sub-admin',
        children: [
            {
                title: "View Exams",
                icon: <CiViewList size={16} />,
                path:"exams"
            },
            {
                title: "Add Exam",
                icon: <IoIosAddCircle size={16} />,
                path: 'exams/add'
            }
        ]
    },
    {
        displayTitle: "Payment",
        icon: <AiFillMoneyCollect size={18} />,
        role: "editor",
        children: [
            {
                title: "View Transactions",
                icon: <CiViewList size={16} />,
                path: "payment/transactions"
            },
            {
                title: "Make Payments",
                icon: <MdOutlinePayments size={16} />,
                path: "payment/pay"
            },
            {
                title: "Payment Distribution",
                icon: <BsGraphUp size={16} />,
                path: 'payment'
            },
            {
                title: "Distribution Details",
                icon: <BsGraphUp size={16} />,
                path: 'payment/details'
            }
        ]
    },
    {
        displayTitle: "Finance",
        icon: <BsCurrencyExchange size={18} />,
        role: 'editor',
        children: [
            {
                title: 'View Salary',
                icon: <GrMoney size={16} />,
                path: "register-salary"
            },
            {
                title: "Add Salary",
                icon: <IoIosAddCircle size={16} />,
                path: 'register-salary/add'
            },
            {
                title: "Add Expense",
                icon: <IoIosAddCircle size={16} />,
                path: "register-salary/add-expense"
            },
            {
                title: "View Expenses",
                icon: <HiOutlineDocumentReport size={16} />,
                path: "register-salary/view-expenses"
            },
            {
                title: "Generate Salary Sheet",
                icon: <HiDocumentReport size={16} />,
                path: 'register-salary/generate-salary-sheet'
            },
            {
                title: "Pay Now",
                icon: <MdOutlinePayments size={16} />,
                path: 'register-salary/pay'
            }
        ]
    },
    {
        displayTitle: "Reports",
        icon: <HiDocumentReport size={18} />,
        role: 'editor',
        children: [
            {
                title: "Payment Reports",
                icon: <HiOutlineDocumentReport size={16} />,
                path: 'report'
            },
            {
                title: "Monthly Expense",
                icon: <HiOutlineDocumentReport size={16} />,
                path: "report/monthly-expense"
            },
            {
                title: "Monthly Salary",
                icon: <HiOutlineDocumentReport size={16} />,
                path: "report/monthly-salary"
            }
        ]
    },
    {
        displayTitle: "Classes",
        icon: <FaChalkboardUser size={18} />,
        role: 'sub-admin',
        children: [
            {
                title: "View Class",
                icon: <FaChalkboardUser size={16} />,
                path: "classes"
            },
            {
                title: "Add Class",
                icon: <IoIosAddCircle size={16} />,
                path: 'classes/add'
            }
        ]
    },
    {
        displayTitle: "Sections",
        icon: <FaLayerGroup size={18} />,
        role: 'sub-admin',
        children: [
            {
                title: "View Section",
                icon: <FaLayerGroup size={16} />,
                path: 'sections'
            },
            {
                title: "Add Section",
                icon: <IoIosAddCircle size={16} />,
                path: 'sections/add'
            }
        ]
    },
    {
        displayTitle: "Subjects",
        icon: <IoBookSharp size={18} />,
        role: 'sub-admin',
        children: [
            {
                title: "View Subjects",
                icon: <IoBookSharp size={16} />,
                path: 'subjects'
            },
            {
                title: "Add Subject",
                icon: <IoIosAddCircle size={16} />,
                path: 'subjects/add'
            }
        ]
    },
    {
        displayTitle: "Results",
        icon: <RiSurveyFill size={18} />,
        role: 'teacher',
        children: [
            {
                title: "Add Result",
                icon: <IoIosAddCircle size={16} />,
                path: 'results/add'
            },
            {
                title: "Check Result",
                icon: <RiSurveyFill size={16} />,
                path: 'results/check'
            },
            {
                title: "Get Certificate",
                icon: <RiSurveyFill size={16} />,
                path: 'results/certificate'
            }
        ]
    },
    {
        displayTitle: 'Routine',
        icon: <AiOutlineSchedule size={18} />,
        role: 'sub-admin',
        children: [
            {
                title: "Add Routine",
                icon: <SlCalender size={16} />,
                path: 'routines'
            }
        ]
    },
    {
        displayTitle: 'Hostel',
        icon: <FaHotel size={18} />,
        role: 'sub-admin',
        children: [
            {
                title: "View Hostels",
                icon: <FaHotel size={16} />,
                path: 'hostels'
            },
            {
                title: "Add Hostel",
                icon: <IoIosAddCircle size={16} />,
                path: 'hostels/add'
            }
        ]
    },
    {
        displayTitle: "Transport",
        icon: <FaBus size={18} />,
        role: 'sub-admin',
        children: [
            {
                title: "View Routes",
                icon: <FaBus size={16} />,
                path: 'transports'
            },
            {
                title: "Add Route",
                icon: <IoIosAddCircle size={16} />,
                path: 'transports/add'
            },
            {
                title: "Add Vehicle",
                icon: <IoIosAddCircle size={16} />,
                path: 'transports/vehicle/add'
            }
        ]
    },
    {
        displayTitle: 'Academic Years',
        icon: <FaCalendar size={18} />,
        role: 'sub-admin',
        children: [
            {
                title: "View Years",
                icon: <CiViewList size={16} />,
                path: 'academic-years'
            },
            {
                title: "Add Year",
                icon: <IoIosAddCircle size={16} />,
                path: 'academic-years/add'
            },
        ]
    },
    {
        displayTitle: "Admin",
        icon: <RiAdminFill size={18} />,
        role: 'admin',
        children: [
            {
                title: "View End Points",
                icon: <CiViewList size={16} />,
                path: 'admins/endpoints'
            },
            {
                title: "View Admins",
                icon: <CiViewList size={16} />,
                path: 'admins'
            },
            {
                title: 'View Permission',
                icon: <MdAdminPanelSettings size={16} />,
                path: 'admins/permissions'
            },
            {
                title: "Give Permission to Role",
                icon: <IoIosAddCircle size={16} />,
                path: 'admins/permissions/give-permission'
            },
            {
                title: "Get Role Based Permission",
                icon: <MdAdminPanelSettings size={16} />,
                path: 'admins/permissions/get-permission'
            }
        ]
    }
];

export default NavLists;