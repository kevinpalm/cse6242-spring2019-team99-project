-- taking equal numbers of samples from each aggregation method
select lemma
from (
	select lemma
	from lemmas
	where nullif(lemma, '') is not null
	order by random()
	limit 8000
	)

union all

select lemma
from (
	select group_concat(lemma, ' ') as lemma
	from lemmas
		join (
			select chat_id
				, from_userid
			from chats
			) using (chat_id)
	where nullif(lemma, '') is not null
	group by from_userid
	order by random()
	limit 8000
	)

union all

select lemma
	from (
	select group_concat(lemma, ' ') as lemma
	from lemmas
		join (
			select chat_id
				, from_userid
				, strftime('%Y-%m-%d', sent_at) as sent_day
				, room_id
			from chats
			) using (chat_id)
	where nullif(lemma, '') is not null
	group by from_userid
		, sent_day
		, room_id
	order by random()
	limit 8000
	)
