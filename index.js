const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

class EthiopianDate {
    constructor(year, month, day, hours, minutes, seconds) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    formatTime() {
        const hourIn12Format = this.hours % 12 || 12; 
        const period = this.hours >= 12 ? 'kemshitu' : 'ke kenu';
        return `year: ${this.year} - Month: ${this.month} - Day: ${this.day} - hours: ${hourIn12Format} - minutes: ${this.minutes} - seconds: ${this.seconds} ${period}`;
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
            this.month = "puagme";
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
    const utcOffset = 3; // Ethiopia is UTC+3
    const localHours = now.getUTCHours() + utcOffset; // Convert UTC to Ethiopian time
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();

    const ethiopianYear = now.getFullYear() + ((localHours < 6) ? -1 : 0); // Adjust year if before 6 AM
    const ethiopianMonth = Math.floor(((localHours + 6) % 24) / 2) + 1; // Simple conversion for month
    const ethiopianDay = Math.floor((localHours + 6) % 24 / 2); // Simple conversion for day

    return new EthiopianDate(ethiopianYear, ethiopianMonth, ethiopianDay, localHours % 24, minutes, seconds);
}

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