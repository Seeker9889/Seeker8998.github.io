/*
Project: Population Forecast-Rabbits Webpage
Author: Sam George
Development Environment: Notepad++ v7, 32 bit; Google Chrome
Javascript
Requirements:
    * Given month m, calculate the estimated population of rabbits p, starting with m=0, p=2
    * Population grows according to the Fibonacci Sequence (1, 1, 2, 3, 5...) fib(), where p=fib(m)*2
Goals:
	* Display answer along with months in "y year(s), m month(s) format" with correct pluralization
	* Display newborns born in a month
*/

var REPRODUCTION_FACTOR=2;	//Factor by which to multiply fib(m) to find estimated population
var newFibVal=0;			//Stores newborn count; defined in fib()

	//Calculation process and display result; returns as soon as something is displayed
	function calculate(val) {
		var fibIndex=1;
		var input=Math.floor(parseInt(val, 10));	//Attempt to get an integer from val
		if (!isFinite(input)) {						//If input is not non-infinite or is not a valid number, request one
			displayOutput("Enter only whole numbers 1 or greater: 1, 2, 3, etc.");
			return;
		}
		if (val.length>6) {							//If there are more than 6 digits, the number is probably too large to calculate (decimals or leading 0's only exception)
			displayOutput("That number is too long. Try fewer digits.");
			return;									
		}
		
		else  										//else is for visual; not strictly needed
		{
			if (input <1 ) {  		//If input is a negative number, request a positive number
				displayOutput("Enter only whole numbers 1 or greater: 1, 2, 3, etc.");
				return;
			}
			else {
				var output=REPRODUCTION_FACTOR*fib(input);		//Estimate amount of rabbits
				var newborn=newFibVal*REPRODUCTION_FACTOR;		//Defined in fib() to catch the population added this month
				if (!isFinite(output)) {						//If the calculated number is too high (val>1475) and output is infinite, request a smaller number
					displayOutput("Too many rabbits for me to count. Try a smaller number.");
					return;
				}
				else										//Display table with input in "year, month" format, total estimate, and newborn estimate
				displayOutput("<table> \
									<tr> \
										<th colspan=2>"+monthsToYearsString(input)+"</th> \
									<tr> \
										<td>Total:</td> \
										<td>"+output.toString()+"</td> \
									</tr> \
									<tr> \
										<td>Newborn:</td> \
										<td>"+newborn.toString()+"</td> \
									</tr> \
								</table>");
				return;
			}
		}
	}
	
	//Display the given output
	function displayOutput(out) {
		document.getElementById('output').innerHTML=out;
	}
	
	//Convert an integer months into the format "y year(s), m month(s)" with appropriate plurals
	function monthsToYearsString(months) {
		var yearPlural=false;
		var monthPlural=false;
		if (months%12 != 1) {			//If there is more than 1 month after dividing out for year...
			monthPlural=true;
		}
		if (months<12 || months>23) {	//If there is less than or greater than 1 year...
			yearPlural=true;
		}
		
		if (monthPlural) {
			if (yearPlural)
				return Math.floor(months/12).toString()+" years, "+(months%12).toString()+" months";
			else
				return Math.floor(months/12).toString()+" year, "+(months%12).toString()+" months";
		}
		else if (yearPlural)
				return Math.floor(months/12).toString()+" years, "+(months%12).toString()+" month";
			else
				return Math.floor(months/12).toString()+" year, "+(months%12).toString()+" month";
		
	}
	
var FIB_FIRST_POSITION_VAL=1;		//Sequence: *1*, 1, 2, 3, 5, 8...
var  FIB_SECOND_POSITION_VAL=1;		//Sequence: 1, *1*, 2, 3, 5, 8...
var FIB_ERROR_VAL=0;				//Returned if an invalid input is given

	//Return value at pos of a one-indexed Fibonacci Sequence by for-loop
	function fib(pos) {
        if (pos<1) {newFibVal=FIB_ERROR_VAL; return FIB_ERROR_VAL;}            			//Invalid input
        if (pos==1) {newFibVal=FIB_FIRST_POSITION_VAL; return FIB_FIRST_POSITION_VAL;}	//Return first value in sequence; new population=starting population
		if (pos==2) {newFibVal=0; return FIB_SECOND_POSITION_VAL;} 						//Return second value in sequence; new population=0 (because fib(1)=fib(2))
		
        else {
            var previous1=FIB_SECOND_POSITION_VAL;  //Most recent value
            var previous2=FIB_FIRST_POSITION_VAL;   //2nd-most-recent value
            var temp=0;
            //For-loop starts from first two values and calculates until value at pos is found
            //For-loop only runs if pos>2
            //If pos is 3, then the calculation in the return statement is sufficient
            for (i=pos; i>3; i--) {
                temp=previous1+previous2;   //Get previous value
                previous2=previous1;        //Set old previous values to 2nd-from-previous value
                previous1=temp;             //Set previous value to new previous value
            }
			newFibVal=previous2;			//Assign the new population for the month
            return previous1+previous2;		//Calculate current total population
        }
	}