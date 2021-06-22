-- SEQUENCE: public.writing_journal__id_seq

-- DROP SEQUENCE public.writing_journal__id_seq;

CREATE SEQUENCE public.writing_journal__id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.writing_journal__id_seq
    OWNER TO smapp;
-- Table: public.writing_journal

-- DROP TABLE public.writing_journal;

CREATE TABLE public.writing_journal
(
    _id integer NOT NULL DEFAULT nextval('writing_journal__id_seq'::regclass),
    user_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    date time without time zone NOT NULL,
    writing_prompt integer NOT NULL,
    text character varying(50000) COLLATE pg_catalog."default" NOT NULL,
    knowledge_relations character varying(5000) COLLATE pg_catalog."default",
    knowledge_lemmas character varying(5000) COLLATE pg_catalog."default",
    knowledge_entities character varying(5000) COLLATE pg_catalog."default",
    knowledge_emotional_traits character varying(5000) COLLATE pg_catalog."default",
    knowledge_behavioural_traits character varying(5000) COLLATE pg_catalog."default",
    CONSTRAINT writing_journal_pkey PRIMARY KEY (_id)
)

TABLESPACE pg_default;

ALTER TABLE public.writing_journal
    OWNER to smapp;