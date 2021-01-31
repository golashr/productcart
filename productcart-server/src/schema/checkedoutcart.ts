export const checkedOutCartSchema = {
	'definitions': {},
	'$schema': 'http://json-schema.org/draft-07/schema#', 
	'$id': 'https://example.com/object1611927718.json', 
	'title': 'Root', 
	'type': 'object',
	'required': [
		'checkedOutProducts',
		'promotionCode'
	],
	'properties': {
		'checkedOutProducts': {
			'$id': '#root/checkedOutProducts', 
			'title': 'Checkedoutproducts', 
			'type': 'array',
			'default': 'any[]',
			'items':{
				'$id': '#root/checkedOutProducts/items', 
				'title': 'Items', 
				'type': 'object',
				'required': [
					'id',
					'count'
				],
				'properties': {
					'id': {
						'$id': '#root/checkedOutProducts/items/id', 
						'title': 'Id', 
						'type': 'string',
						'default': '',
						'examples': [
							'wf'
						],
						'pattern': '^.*$'
					},
					'count': {
						'$id': '#root/checkedOutProducts/items/count', 
						'title': 'Count', 
						'type': 'integer',
						'examples': [
							0
						],
						'default': 0
					}
				}
			}
		},
		'promotionCode': {
			'$id': '#root/promotionCode', 
			'title': 'PromotionCode', 
			'type': 'string',
			'default': '',
			'examples': [
				'YYGWKJD'
			],
			'pattern': '^.*$'
		}
	}
};

