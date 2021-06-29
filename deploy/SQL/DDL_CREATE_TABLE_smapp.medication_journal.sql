-- SEQUENCE: public.medication_journal__id_seq

-- DROP SEQUENCE public.medication_journal__id_seq;

CREATE SEQUENCE public.medication_journal__id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.medication_journal__id_seq
    OWNER TO smapp;

-- Table: public.medication_journal

-- DROP TABLE public.medication_journal;

CREATE TABLE public.medication_journal
(
    _id integer NOT NULL DEFAULT nextval('medication_journal__id_seq'::regclass),
    user_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    date time without time zone NOT NULL,
    medication_prompt integer NOT NULL,
    text character varying(50000) COLLATE pg_catalog."default" NOT NULL,
    knowledge_relations character varying(5000) COLLATE pg_catalog."default",
    knowledge_lemmas character varying(5000) COLLATE pg_catalog."default",
    knowledge_entities character varying(5000) COLLATE pg_catalog."default",
    knowledge_emotional_traits character varying(5000) COLLATE pg_catalog."default",
    knowledge_behavioural_traits character varying(5000) COLLATE pg_catalog."default",
    CONSTRAINT medication_journal_pkey PRIMARY KEY (_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.medication_journal
    OWNER to smapp;