import { ShellModel } from '../../shell/data-store';

export class ExploreItemModel {
  image: string;
  icon: string;
  name: string;
  description: string;
  category: string;
  address: string;
  rating: number;
  reviewsCount: number;
}

export class ExploreListingModel extends ShellModel {
  items: Array<ExploreItemModel> = [
    new ExploreItemModel(),
    new ExploreItemModel(),
    new ExploreItemModel(),
    new ExploreItemModel()
  ];

  constructor() {
    super();
  }
}
