import { Card, Skeleton } from '@nextui-org/react'
import React from 'react'

type Props = {}

const SekeletonReport = (props: Props) => {
    return (
        <Card className=" space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
                <div className="h-30 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <div className="flex gap-10">
                    <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </div>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>

                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        </Card>
    )
}

export default SekeletonReport