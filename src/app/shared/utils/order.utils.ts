import { Part } from "../interfaces/part";

export class OrderUtils {

  static groupByPrefix(items: Part[]): Part[][] {
    const groups: Record<string, Part[]> = {};

    items.forEach(item => {
        const prefix = item.ref.split('-')[0];
        if (!groups[prefix]) {
            groups[prefix] = [];
        }
        groups[prefix].push(item);
    });

    return Object.values(groups);
  }

}
