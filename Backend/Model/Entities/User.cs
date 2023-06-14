using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Model.Entities;

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }
    public string FamilyRole { get; set; }
    public DateTime Birthday { get; set; }
    public List<ToDo> Tasks { get; set; }
    public List<ScheduledProgram> Programs { get; set; }
    public string AvatarPic { get; set; }
    public List<Reward> Rewards { get; set; }
    public Dictionary<TaskType, int> ActualRewardPoints { get; set; }

}