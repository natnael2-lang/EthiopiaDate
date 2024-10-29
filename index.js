const express = require("express");
const app = express();
const cors=require("cors")
app.use(cors())

class EthiopianDate {
    constructor(year, month, day, hours, minutes, seconds) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    
    toString() {
        return `${this.year } - Month: ${this.month} - Day: ${this.day} ${this.hours % 12}:${this.minutes}:${this.seconds}`;
    }

    
    formatTime() {
        const hourIn12Format = this.hours % 12 || 12; 
        const period = this.hours >= 12? 'kemshitu' : 'ke kenu';
        return `year: ${this.year } - Month: ${this.month} - Day: ${this.day} -hours: ${hourIn12Format} -minutes :${this.minutes} -seconds :${this.seconds} ${period}`;
    }

    
    advanceOneSecond() {
        this.seconds++;

        if (this.seconds >= 60) {
            this.seconds = 0;
            this.minutes++;
            if (this.minutes >= 60) {
                this.minutes = 0;
                this.hours++;
                if (this.hours >= 24) {
                    this.hours = 0;
                    this.advanceOneDay();
                }
            }
        }
    }

   
    advanceOneDay() {
        this.day++;

        
        
        if (this.month === 13) { 
            this.month="puagme"
            const daysInPagume = (this.isLeapYear() ? 6 : 5);
            if (this.day > daysInPagume) {
                this.day = 1; 
                this.month = 1; 
                this.year++;
            }
        } else if (this.day > 30) {
            this.day = 1; 
            this.month++;
            if (this.month > 13) { 
                this.month = 1;
                this.year++;
            }
        }
    }

    
    isLeapYear() {
        return this.year % 4 === 0;
    }
}


function getCurrentEthiopianDate() {
    const now = new Date();
    const hours = now.getHours() - 6; 
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

   
    return new EthiopianDate(2017, 2, 19, hours, minutes, seconds);
}


function automaticDateCounter() {
    let ethiopianDate = getCurrentEthiopianDate();

   

    setInterval(() => {
        ethiopianDate.advanceOneSecond(); 
        console.log(` ${ethiopianDate.formatTime()}`);
    }, 1000); 
}


automaticDateCounter();


app.get('/ethiopian-date', (req, res) => {
    const ethiopianDate = getCurrentEthiopianDate(); 

    res.json({
        
        formattedTime: ethiopianDate.formatTime()
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});