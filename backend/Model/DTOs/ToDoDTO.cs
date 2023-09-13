using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Model.Entities;

namespace backend.Model.DTOs;

public class ToDoDTO
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string? TaskName { get; set; }
    public string? Description { get; set; }
    public DateTime? Deadline { get; set; }
    public ToDoType? Type { get; set; }
    public int? RewardPoint { get; set; }
    public bool Ready { get; set; }

    public long OwnerID { get; set; }

}