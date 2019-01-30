import _ from 'lodash'
import { SummaryItem } from 'models/SummaryItem'
import { View, viewFromContentType } from 'models/View'

export interface SummaryModel extends View {
  items: SummaryItem[];
}

export class JSONSummary implements SummaryModel {
  readonly type = 'summary'
  readonly title: string
  readonly items: SummaryItem[]

  constructor(private readonly ct: ContentType) {
    this.title = ct.metadata.title

    this.items = _.map(this.ct.config.sections, (section) => {
      return {
        header: section.header,
        content: viewFromContentType(section.content),
      }
    })
  }
}