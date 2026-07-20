// Type definitions สำหรับ Form domain — ใช้ร่วมกันทั้ง service และ component
export interface FormTemplate {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

// โครงสร้างข้อมูลที่ map แล้วสำหรับแสดง UI
export interface FormDisplayItem {
  id: string;
  number: string;
  title: string;
  description: string;
}
