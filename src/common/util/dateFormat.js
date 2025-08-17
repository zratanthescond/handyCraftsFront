import * as dayjs from 'dayjs'

export default function DateFormat({date, format, ...rest}) {

    const target = dayjs(date);

    return <span {...rest}>{target.format(format)}</span>
}