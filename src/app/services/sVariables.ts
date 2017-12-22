import {Appointment} from '../models/appointment';
import {EmployeesAndTimes} from '../models/employeesAndTimes';
export class SVariables {
  public static apiUrl = 'http://api.avisits.com/api/';
  public static chainId: number; // example v37
  public static city: string;
  public static salonId: number;
  public static date: string;  // date on "2018-12-02" format
  public static employeesAndTimes: EmployeesAndTimes[];  // for getting Employees And Times
  public static clientId: number;
  public static settings: { color: string, steps_employee: string[], steps_service: string[]};  // only for default settings on switcher service
  public static steps_employee: string[];
  public static steps_service: string[];
  public static allowCheckMasterService: boolean = false;   // this is for - "w_let_check_steps": 0
  public static sequenceNonCheckStep: string;   // sequence on - "w_let_check_steps": 0
  public static appointment: Appointment[];
  public static masterOrService: string;  // for last page TimeBook
}
