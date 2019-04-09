class Statistics {
    // MG stands for message growth, UG for user growth
    constructor(data) {
        this.data = data[0];
        this.cumulativeUsers = this.data["cumulative_users"];
        this.cumulativeMessages = this.data["cumulative_messages"];
        this.maxWeekUG = this.data["max_u_week"];
        this.maxWeekMG = this.data["max_m_week"];
        this.maxFortnightUG = this.data["max_u_fortnight"];
        this.maxFortnightMG = this.data["max_m_fortnight"];
        this.maxMonthUG = this.data["max_u_month"];
        this.maxMonthMG = this.data["max_m_month"];
        this.maxQuarterUG= this.data["max_u_quarter"];
        this.maxQuarterMG = this.data["max_m_quarter"];
        this.maxWeekMGCm = this.data["max_m_week_cm"];
        this.maxFortnightMGCm = this.data["max_m_fortnight_cm"];
        this.maxMonthMGCm = this.data["max_m_month_cm"];
        this.maxQuarterMGCm = this.data["max_m_quarter_cm"];
        this.maxWeekUGCm = this.data["max_u_week_cm"];
        this.maxFortnightUGCm = this.data["max_u_fortnight_cm"];
        this.maxMonthUGCm = this.data["max_u_month_cm"];
        this.maxQuarterUGCm = this.data["max_u_quarter_cm"];
    }
}

export { Statistics };