export interface DonationRequest {
    id: number| undefined;
    ssn: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    age: number | undefined;
    bloodType: string | undefined;
    gender: string | undefined;
    phone: string | undefined;
    location: string | undefined;
    chronicDiseases: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
    longitude: number | undefined;
    latitude: number | undefined;
    // sectionId: number | undefined;
    applicationUserId: string | undefined;
}