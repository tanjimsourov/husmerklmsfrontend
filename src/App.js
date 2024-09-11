import { Dashboard, Courses, Students, Teachers, StudentAttendance, AddStudent, Login, Admins, RegisterAdmin, RegisterAcademicYear, AcademicYears, AddTeacher, RegisterStudentClass, DeleteSingleStudent, RegisterNewSection, DeleteSingleTeacher, RegisterCourse, EditSingleStudent, SingleTeacherProfile, EditTeacher, SingleClass, SingleClassEdit, RegisterRoutine, SingleSalaryTemplate, ViewSalaries, DeleteSingleClass, Sections, Payment, Transactions, GetFee, Employees, AddSingleEmployee, AddSingleHostel, Transports, AddSingleRoute, Results, Hostels, SingleHostel, AvailableSeats, BulkUpload, AddExam, ViewExam, CheckSingleResult, ExamSchedule, AddSingleVehicle, ViewSingleVehicle, ViewSingleSection, DeleteSingleSection, EditSingleSection, DeleteSingleEmmployee, ViewSingleEmployee, EditSingleEmployee, SingleCourse, DeleteSingleCourse, SingleStudent, SingleCourseEdit, SingleRoom, EditSingleRoom, DeleteSingleHostel, DeleteSingleRoom, PaymentFor, ViewFeeDistribution, ViewSingleFeeDistribution, SelectPayment, GetReportByType, IncomeReport, SingleIncomeReport, EndPoints, ViewSingleExam, DeleteSingleExam, GetCertificate, ViewPermission, RegisterPermission, GivePermission, ViewSingleTransaction, AddExpense, AddStaff, ViewStaff, DeleteSingleDistribution, DeleteSingleTransaction, ViewExpenses, ViewSingleExpense, DeleteSingleExpense, DeleteSingleSalary, ViewSingleIncomeReport, DeleteSingleStaff, GenerateSalarySheet, MonthlyExpense, MonthlySalary, ViewUsers, Pay, SinglePayment } from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ViewClasses from "./pages/classes/ViewClasses";
import AddSingleResult from "./pages/results/AddSingleResult";
import ViewSingeRoute from "./pages/transports/ViewSingeRoute";
import {SelectionTable} from "./components/selection_table";
import GetFeeDistribution from "./pages/payment/GetFeeDistribution";
import GetRoleBasedPermission from "./pages/admins/GetRoleBasedPermission";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        

          <Route path="/" element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="students">
              <Route index element={<Students />} />
              <Route path=":id" element={<SingleStudent />} />
              <Route path="add" element={<AddStudent />} />
              <Route path="delete/:id" element={<DeleteSingleStudent />} />
              <Route path="edit/:id" element={<EditSingleStudent />} />
              <Route path="upload" element={<BulkUpload />} />
            </Route>
            <Route path="exams">
                <Route index element={<ViewExam />} />
                <Route path="add" element={<AddExam />} />
                <Route path=":id" element={<ViewSingleExam />} />
                <Route path="delete/:id" element={<DeleteSingleExam />} />
            </Route>
            <Route path="classes">
                <Route index element={<ViewClasses />} />
                <Route path="add" element={<RegisterStudentClass />} />
                <Route path=":id" element={<SingleClass />} />
                <Route path={'edit/:id'} element={<SingleClassEdit />} />
                <Route path="delete/:id" element={<DeleteSingleClass />} />
            </Route>
            <Route path="routines">
               <Route index element={<RegisterRoutine />} />
            </Route>
            <Route path="sections">
                <Route index element={<Sections />}></Route>
                <Route path="add" element={<RegisterNewSection />}></Route>
                <Route path=":id" element={<ViewSingleSection />} />
                <Route path="delete/:id" element={<DeleteSingleSection />} />
                <Route path="edit/:id" element={<EditSingleSection />} />
            </Route>
            <Route path="subjects">
                <Route index element={<Courses />} />
                <Route path="add" element={<RegisterCourse />} />
                <Route path=":id" element={<SingleCourse />} />
                <Route path="delete/:id" element={<DeleteSingleCourse />} />
                <Route path="edit/:id" element={<SingleCourseEdit />} />
            </Route>
            <Route path="results">
              <Route path="add" element={<AddSingleResult />} />
              <Route path="check" element={<CheckSingleResult />} />
              <Route path="certificate" element={<GetCertificate />} />
            </Route>
            <Route path="teachers">
              <Route index element={<Teachers />} />
              <Route path="add" element={<AddTeacher />} />
              <Route path="delete/:id" element={<DeleteSingleTeacher />} />
              <Route path="edit/:id" element={<EditTeacher />} />
              <Route path=":id" element={<SingleTeacherProfile />} />
            </Route>
            <Route path="staffs">
                <Route index element={<ViewStaff />} />
                <Route path="users" element={<ViewUsers />} />
                <Route path="add" element={<AddStaff />} />
                <Route path="delete/:id" element={<DeleteSingleStaff />} />
                
            </Route>
            <Route path="employees">
                <Route index element={<Employees />} />
                <Route path="add" element={<AddSingleEmployee />} />
                <Route path="delete/:id" element={<DeleteSingleEmmployee />} />
                <Route path=":id" element={<ViewSingleEmployee />} />
                <Route path="edit/:id" element={<EditSingleEmployee />} />
            </Route>
            <Route path="hostels">
                <Route index element={<Hostels />} />
                <Route path="add" element={<AddSingleHostel />} />
                <Route path=":hostelId">
                    <Route index element={<SingleHostel />} />
                    <Route path=":roomId">
                        <Route index element={<SingleRoom />} />
                        <Route path=":seatId" element={<EditSingleRoom />} />
                    </Route>
                    <Route path="delete/:id" element={<DeleteSingleRoom />} />
                </Route>
                
                <Route path="delete/:id" element={<DeleteSingleHostel />} />
            </Route>
            <Route path="transports">
                <Route index element={<Transports />} />
                <Route path="add" element={<AddSingleRoute />} />
                <Route path="vehicle/add" element={<AddSingleVehicle />} />
                <Route path=":id" element={<ViewSingeRoute />} />
            </Route>
            <Route path="s_attendance">
                <Route index element={<StudentAttendance />} />
            </Route>
            <Route path="academic-years">
                <Route index element={<AcademicYears />} />
                <Route path="add" element={<RegisterAcademicYear />} />
            </Route>
            <Route path="admins">
                <Route index element={<Admins />} />
                <Route path="add" element={<RegisterAdmin />} />
                <Route path='endpoints' element={<EndPoints />} />
                <Route path="permissions" >
                    <Route index element={<ViewPermission /> } />
                    <Route path="add" element={<RegisterPermission />} />
                    <Route path="give-permission" element={<GivePermission />} />
                    <Route path="get-permission" element={<GetRoleBasedPermission />} />
                </Route>
            </Route>
            <Route path="register-salary">
                <Route index element={<ViewSalaries />} />
                <Route path="delete/:id" element={<DeleteSingleSalary />} />
                <Route path=":id" element={<ViewSingleIncomeReport />} />
                <Route path="add" element={<SingleSalaryTemplate />} />
                <Route path="add-expense" element={<AddExpense />} />
                <Route path="generate-salary-sheet" element={<GenerateSalarySheet />} />
                <Route path="pay">
                    <Route index element={<Pay />} />
                    <Route path=":id" element={<SinglePayment />} />
                </Route>
                <Route path="view-expenses">
                    <Route index element={<ViewExpenses />} />
                    <Route path=":id" element={<ViewSingleExpense />} />
                    <Route path="delete/:id" element={<DeleteSingleExpense />} />
                </Route>
            </Route>
            <Route path="payment">
                <Route index element={<PaymentFor />} />
                <Route path="pay">
                    <Route index element={<SelectPayment />} />
                    <Route path=":class" element={<Payment />} />
                </Route>
                <Route path="transactions" >
                    <Route index element={<Transactions />} />
                    <Route path=":id" element={<ViewSingleTransaction />} />
                    <Route path="delete/:id" element={<DeleteSingleTransaction />} />
                </Route>
                <Route path="details" >
                    <Route index element={<GetFeeDistribution />} />
                    <Route path=":year">
                        <Route index element={<ViewFeeDistribution />} />
                        <Route path=':id' element={<ViewSingleFeeDistribution />} />
                        <Route path="delete/:id" element={<DeleteSingleDistribution />} />
                    </Route>
                </Route>

            </Route>
            <Route path='report'>
                <Route index element={<IncomeReport />}>
                </Route>
                {/* <Route path=":id" element={<SingleIncomeReport />} /> */}
                <Route path="type" element={<GetReportByType />} />
                <Route path="monthly-expense" element={<MonthlyExpense />} />
                <Route path="monthly-salary" element={<MonthlySalary />} />
            </Route>
            <Route path="test" element={<SelectionTable />} />
          </Route>

        
      </Routes>
    </Router>
  );
}

export default App;
