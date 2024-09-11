import { PiStudentFill, PiStudentBold } from 'react-icons/pi';
import { IoIosAddCircle } from 'react-icons/io';
import { FaChalkboardTeacher, FaCalendar, FaLayerGroup, FaHotel, FaBus, FaPen, FaCloudUploadAlt } from 'react-icons/fa';
import { CiViewList } from 'react-icons/ci';
import { FaChalkboardUser, FaUserTie } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { IoBookSharp } from 'react-icons/io5'
import {MdAdminPanelSettings, MdOutlinePayments} from 'react-icons/md'
import { SlCalender } from 'react-icons/sl'
import { RiSurveyFill } from "react-icons/ri";
import { MdEventAvailable } from "react-icons/md";
import { GrSchedule } from "react-icons/gr";
import { HiDocumentReport } from "react-icons/hi"

const NavLists = [
    {
        displayTitle: "Students",
        icon: <PiStudentFill />,
        role: 'sub-admin',
        children: [
            {
                title: "View Students",
                icon: <CiViewList />,
                path: 'students'
            },
            {
                title: "Add Student",
                icon: <IoIosAddCircle />,
                path: 'students/add'
            },
            {
                title: "Bulk Upload",
                icon: <FaCloudUploadAlt />,
                path: 'students/upload'
            }
            
        ]
    },
    {
        displayTitle: "Teachers",
        icon: <FaChalkboardTeacher />,
        role: 'sub-admin',
        children: [
            {
                title: "View Teachers",
                icon: <CiViewList />,
                path: 'teachers'
            },
            {
                title: "Add Teacher",
                icon: <IoIosAddCircle />,
                path: 'teachers/add'
            }
        ]
    },
    {
        displayTitle: "Staff",
        icon: <FaUserTie />,
        role: 'sub-admin',
        children: [
            {
                title: "View Staffs",
                icon: <CiViewList />,
                path: 'staffs'
            },
            {
                title: "View Users",
                icon: <CiViewList />,
                path: 'staffs/users'
            },
            {
                title: "Add Staff",
                icon: <IoIosAddCircle />,
                path: 'staffs/add'
            }
        ]
    },
    {
        displayTitle: "Employee",
        icon: <FaUserTie />,
        role: 'admin',
        children: [
            {
                title: "View Employees",
                icon: <CiViewList />,
                path: 'employees'
            },
            {
                title: "Add Employees",
                icon: <IoIosAddCircle />,
                path: 'employees/add'
            }
        ]
    },
    {
        displayTitle: 'Attendance',
        icon: <CiViewList />,
        role: 'sub-admin',
        children: [
            {
                title: "Student Attendance",
                icon: <PiStudentBold />,
                path: 's_attendance'
            }
        ]
    },
    {
        displayTitle: "Exams",
        icon: <FaPen />,
        role: 'sub-admin',
        children: [
            
            {
                title: "Add Exam",
                icon: <IoIosAddCircle />,
                path: 'exams/add'
            },
            {
                title: "View Exams",
                icon: <CiViewList />,
                path:"exams"
            }
        ]
    },
    {
        displayTitle: "Payment",
        icon: <MdOutlinePayments />,
        role: "editor",
        children: [
            {
                title: "View Transactions",
                icon: <CiViewList />,
                path: "payment/transactions"
            },
            {
                title: "Make Payments",
                icon: <MdOutlinePayments />,
                path: "payment/pay"
            },
            {
                title: "Payment Distribution",
                icon: <MdOutlinePayments />,
                path: 'payment'
            },
            {
                title: "Distribution Details",
                icon: <MdOutlinePayments />,
                path: 'payment/details'
            }
        ]
    },
    {
        displayTitle: "Finance",
        icon: <GrMoney />,
        role: 'editor',
        children: [
            {
                title: 'View Salary',
                icon: <GrMoney />,
                path: "register-salary"
            },
            {
                title: "Add Salary",
                icon: <IoIosAddCircle />,
                path: 'register-salary/add'
            },
            {
                title: "Add Expense",
                icon: <IoIosAddCircle />,
                path: "register-salary/add-expense"
            },
            {
                title: "View Expenses",
                icon: <GrMoney />,
                path: "register-salary/view-expenses"
            },
            {
                title: "Generate Salary Sheet",
                icon: <GrMoney />,
                path: 'register-salary/generate-salary-sheet'
            },
            {
                title: "Pay Now",
                icon: <GrMoney />,
                path: 'register-salary/pay'
            }
        ]
    },
    {
        displayTitle: "Get Report",
        icon: <HiDocumentReport />,
        role: 'editor',
        children: [
            {
                title: "Payment Reports",
                icon: <HiDocumentReport />,
                path: 'report'
            },
            {
                title: "Monthly Expense",
                icon: <HiDocumentReport />,
                path: "report/monthly-expense"
            },
            {
                title: "Monthly Salary",
                icon: <HiDocumentReport />,
                path: "report/monthly-salary"
            }
        ]
    },
    {
        displayTitle: "Classes",
        icon: <FaChalkboardUser />,
        role: 'sub-admin',
        children: [
            {
                title: "View Class",
                icon: <FaChalkboardUser />,
                path: "classes"
            },
            {
                title: "Add Class",
                icon: <IoIosAddCircle />,
                path: 'classes/add'
            }
        ]
    },
    {
        displayTitle: "Sections",
        icon: <FaLayerGroup />,
        role: 'sub-admin',
        children: [
            {
                title: "View Section",
                icon: <FaLayerGroup />,
                path: 'sections'
            },
            {
                title: "Add Section",
                icon: <IoIosAddCircle />,
                path: 'sections/add'
            }
        ]
    },
    {
        displayTitle: "Subjects",
        icon: <IoBookSharp />,
        role: 'sub-admin',
        children: [
            {
                title: "View Subjects",
                icon: <IoBookSharp />,
                path: 'subjects'
            },
            {
                title: "Add Subject",
                icon: <IoIosAddCircle />,
                path: 'subjects/add'
            }
        ]
    },
    {
        displayTitle: "Results",
        icon: <RiSurveyFill />,
        role: 'teacher',
        children: [
            {
                title: "Add Result",
                icon: <IoIosAddCircle />,
                path: 'results/add'
            },
            {
                title: "Check Result",
                icon: <RiSurveyFill />,
                path: 'results/check'
            },
            {
                title: "Get Certificate",
                icon: <RiSurveyFill />,
                path: 'results/certificate'
            }
        ]

    },
    {
        displayTitle: 'Routine',
        icon: <SlCalender />,
        role: 'sub-admin',
        children: [
            {
                title: "Add Routine",
                icon: <SlCalender />,
                path: 'routines'
            }
        ]
    },
    {
        displayTitle: 'Hostel',
        icon: <FaHotel />,
        role: 'sub-admin',
        children: [
            {
                title: "View Hostels",
                icon: <FaHotel />,
                path: 'hostels'
            },
            {
                title: "Add Hostel",
                icon: <IoIosAddCircle />,
                path: 'hostels/add'
            }
        ]
    },
    {
        displayTitle: "Transport",
        icon: <FaBus />,
        role: 'sub-admin',
        children: [
            {
                title: "View Routes",
                icon: <FaBus />,
                path: 'transports'
            },
            {
                title: "Add Route",
                icon: <IoIosAddCircle />,
                path: 'transports/add'
            },
            {
                title: "Add Vehicle",
                icon: <IoIosAddCircle />,
                path: 'transports/vehicle/add'
            }
        ]
    },
    {
        displayTitle: 'Academic Years',
        icon: <FaCalendar />,
        role: 'sub-admin',
        children: [
            {
                title: "View Years",
                icon: <CiViewList />,
                path: 'academic-years'
            },
            {
                title: "Add Year",
                icon: <IoIosAddCircle />,
                path: 'academic-years/add'
            },
        ]
    },
    {
        displayTitle: "Admin",
        icon: <MdAdminPanelSettings />,
        role: 'admin',
        children: [
            {
                title: "View End Points",
                icon: <CiViewList />,
                path: 'admins/endpoints'
            },
            {
                title: "View Admins",
                icon: <CiViewList />,
                path: 'admins'
            },
            {
                title: 'View Permission',
                icon: <CiViewList />,
                path: 'admins/permissions'
            },
            {
                title: "Give Permission to Role",
                icon: <IoIosAddCircle />,
                path: 'admins/permissions/give-permission'
            },
            {
                title: "Get Role Based Permission",
                icon: <IoIosAddCircle />,
                path: 'admins/permissions/get-permission'
            }
            
        ]
    }
]

export default NavLists;