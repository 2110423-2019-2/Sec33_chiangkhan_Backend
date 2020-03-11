import { EntityRepository, Repository } from "typeorm";
import { Member } from "./member.entity";

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {

}