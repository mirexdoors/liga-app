<template>
	<v-col cols="12">
		<v-row>
			<v-col
				sm="12"
				class="caption"
			>
				<v-card
					outline
					tile
					class="orange--text pa-1"
				>
					{{title}}
				</v-card>

				<v-row
					v-for="item in items"
					:key="item.name"
					no-gutters
                    class="my-1"
				>
					<v-col
                        cols="5"
						sm="6"
                    >
						<v-card
							class="pa-1"
						>
							<router-link
								:to="translit(item.name)"
								class="player__link"
							>
                                {{item.name}}
							</router-link>
						</v-card>
					</v-col>
					<v-col
						cols="4"
						sm="3"
					>
						<v-card
							height="100%"
							class="pa-1"
							:style="`color: ${item.color}`"
						>
							{{item.team}}
						</v-card>
					</v-col>
					<v-col
						cols="3"
						sm="3"
					>
						<v-card
							height="100%"
							class="pa-1"
						>
							{{item[param]}}
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>
  export default {
    name: 'topTable',
    props: {
      title: {
        type: String,
        default: ''
      },
      param: {
        type: String,
        default: '',
      },
      items: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
  }
</script>
