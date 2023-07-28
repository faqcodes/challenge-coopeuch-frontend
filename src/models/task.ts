export interface Task {
  taskId: number;
  createAt: Date;
  description: string;
  active: boolean;
  _links?: {
    self: { href: string };
    update: { href: string };
    delete: { href: string };
  };
}
