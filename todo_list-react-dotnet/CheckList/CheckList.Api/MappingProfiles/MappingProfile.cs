using AutoMapper;
using CheckList.Domain;
using CheckList.Shared;

namespace CheckList.Api;

public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<TaskEntity, TaskDto>()
			.ForMember(d => d.UserId, opt => opt.Ignore());

		CreateMap<TaskDto, TaskEntity>()
			.ForMember(d => d.CreatedDate, opt => opt.Ignore())
			.ForMember(d => d.UpdatedDate, opt => opt.Ignore());
    }
}
