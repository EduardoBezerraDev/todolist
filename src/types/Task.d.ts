interface TeditedTask {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    status: string;
  }

  interface TformData {
    name: string;
    startDate: Date;
    endDate: Date;
    status: string;
  }

  interface TtaskProps {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    status: string;
    onDelete: (id: number) => void;
  }
  
  type TtaskType = {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    status: string;
  }
  

  export {TeditedTask, TformData, TtaskProps, TtaskType}
  