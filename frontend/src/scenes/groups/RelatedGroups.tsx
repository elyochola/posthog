import { useValues } from 'kea'
import { LemonTable, LemonTableColumns } from 'lib/lemon-ui/LemonTable'
import { ActorType } from '~/types'
import { groupsModel } from '~/models/groupsModel'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import { capitalizeFirstLetter } from 'lib/utils'
import { PersonDisplay } from 'scenes/persons/PersonDisplay'
import { relatedGroupsLogic } from 'scenes/groups/relatedGroupsLogic'
import { GroupActorDisplay } from 'scenes/persons/GroupActorDisplay'

interface Props {
    groupTypeIndex: number | null
    id: string
}

export function RelatedGroups({ groupTypeIndex, id }: Props): JSX.Element {
    const { relatedActors, relatedActorsLoading } = useValues(relatedGroupsLogic({ groupTypeIndex, id }))
    const { aggregationLabel } = useValues(groupsModel)

    const columns: LemonTableColumns<ActorType> = [
        {
            title: 'Type',
            key: 'type',
            render: function RenderActor(_, actor: ActorType) {
                if (actor.type === 'group') {
                    return <>{capitalizeFirstLetter(aggregationLabel(actor.group_type_index).singular)}</>
                } else {
                    return (
                        <>
                            <UserOutlined /> Person
                        </>
                    )
                }
            },
        },
        {
            title: 'id',
            key: 'id',
            render: function RenderActor(_, actor: ActorType) {
                if (actor.type == 'group') {
                    return <GroupActorDisplay actor={actor} />
                } else {
                    return <PersonDisplay person={actor} withIcon={false} />
                }
            },
        },
    ]

    return (
        <LemonTable
            dataSource={relatedActors}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 30, hideOnSinglePage: true }}
            loading={relatedActorsLoading}
            nouns={['related group', 'related groups']}
            emptyState="No related groups found"
        />
    )
}
